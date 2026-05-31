from __future__ import annotations

import argparse
import math
import os
import random
import re
import struct
import wave
from pathlib import Path

from openai import OpenAI


SITE = Path(__file__).resolve().parents[1]
TMP = Path("/private/tmp/dsjl-audio")

CLIPS = [
    {
        "case": "case-001",
        "label": "VP voicemail",
        "voice": "coral",
        "input": "The onboarding numbers look fantastic. If analytics is comfortable, I want to cite the thirty-eight percent lift in tomorrow's executive deck. Please do not overcomplicate this unless there is a real problem.",
        "instructions": "Sound like a real executive leaving a short late-evening office voicemail: natural, slightly rushed, confident, mild phone compression, not theatrical, not robotic.",
        "out": SITE / "public/media/case-001-vp-voicemail.wav",
    },
    {
        "case": "case-001",
        "label": "Engineering standup",
        "voice": "ash",
        "input": "Quick note from data engineering. The guide-step-viewed event was added to the active-user event family on Wednesday so onboarding analytics would populate. Same field name, but the event is not equivalent to the old core activity signal.",
        "instructions": "Sound like a real data engineering lead speaking in a clipped internal standup: calm, practical, slightly compressed laptop microphone, natural pauses, not announcer-like, not robotic.",
        "out": SITE / "public/media/case-001-engineering-standup.wav",
    },
    {
        "case": "case-002",
        "label": "PM voice note",
        "voice": "verse",
        "input": "The trial looks good in the US paid mobile segment. It is significant, and we need the launch call before planning locks. I know the overall number is flatter, but this is the audience we care about.",
        "instructions": "Sound like a real product manager leaving a short internal phone note: natural, slightly hurried, confident, mild phone compression, office room tone, not theatrical, not robotic.",
        "out": SITE / "public/media/case-002-pm-voice-note.wav",
    },
    {
        "case": "case-002",
        "label": "Analyst review",
        "voice": "ash",
        "input": "Quick flag on the checkout test. The primary metric missed, the winning segment was added after two interim looks, and assignment is off by browser. I would not call this a clean win without fixing randomization and rerunning the readout.",
        "instructions": "Sound like a calm data analyst speaking in an experiment review meeting: matter-of-fact, laptop microphone compression, natural pauses, low meeting-room tone, not announcer-like, not robotic.",
        "out": SITE / "public/media/case-002-analyst-review.wav",
    },
    {
        "case": "case-003",
        "label": "Save desk call",
        "voice": "ash",
        "input": "Risk alone is not how we pick accounts. We call the ones where a conversation could still change the renewal, and we skip some scary accounts when procurement is already gone.",
        "instructions": "Sound like a real senior customer-success manager speaking in a quick internal standup: practical, conversational, slight room tone, laptop microphone compression, not theatrical, not robotic.",
        "out": SITE / "public/media/case-003-save-desk-call.wav",
    },
    {
        "case": "case-004",
        "label": "Shift change",
        "voice": "verse",
        "input": "Evening venues are the hard part. Unless a complaint comes in, we do not always get back there. The score is picking up some of that history, not just the kitchen risk.",
        "instructions": "Sound like a real field supervisor giving a short handoff after a shift: slightly tired, matter-of-fact, mild office background tone, natural pauses, not announcer-like, not robotic.",
        "out": SITE / "public/media/case-004-shift-change.wav",
    },
    {
        "case": "case-005",
        "label": "Teacher hallway",
        "voice": "coral",
        "input": "The app worked best when we protected time in class. Optional homework was a different thing. The motivated students did it, but the scheduled block changed who actually got practice.",
        "instructions": "Sound like a real middle-school math teacher leaving a quick hallway voice memo: warm, candid, mild school hallway room tone, natural rhythm, not polished, not robotic.",
        "out": SITE / "public/media/case-005-teacher-hallway.wav",
    },
    {
        "case": "case-006",
        "label": "Council packet voicemail",
        "voice": "verse",
        "input": "The model says eighty-two overflow beds at peak. I need a number for the council packet by Friday, and I would rather not ask for a larger line unless the evidence really supports it.",
        "instructions": "Sound like a real deputy director leaving a brief office voicemail before a public budget deadline: practical, slightly tired, mild room tone, natural pauses, not theatrical, not robotic.",
        "out": SITE / "public/media/case-006-council-packet-voicemail.wav",
    },
    {
        "case": "case-006",
        "label": "Outreach van radio",
        "voice": "ash",
        "input": "We are not seeing one big camp anymore. It is smaller groups by the bus depot and library, and a few families in cars. The old count route misses some of them unless we add the early loop.",
        "instructions": "Sound like a real outreach worker speaking over a short dispatch recording from a van: candid, calm, slight radio compression, faint vehicle background feel, not announcer-like, not robotic.",
        "out": SITE / "public/media/case-006-outreach-van-radio.wav",
    },
    {
        "case": "case-007",
        "label": "Launch memo voicemail",
        "voice": "verse",
        "input": "The backlog is finally moving. The score does not use race, ethnicity, or language, and the pilot caught more bad claims. I need to know whether fairness has a real blocker or just a communications issue.",
        "instructions": "Sound like a real state agency deputy commissioner leaving a concise office voicemail: controlled, practical, a little deadline pressure, mild room tone, not theatrical, not robotic.",
        "out": SITE / "public/media/case-007-launch-memo-voicemail.wav",
    },
    {
        "case": "case-007",
        "label": "Benefits navigator call",
        "voice": "coral",
        "input": "The people getting stuck are not all suspicious. Some are using a cousin's address, a library computer, or a translated form. They clear eventually, but the first check is late.",
        "instructions": "Sound like a real nonprofit benefits navigator speaking on a quick call: candid, grounded, mild office background noise, natural pauses, not polished, not robotic.",
        "out": SITE / "public/media/case-007-benefits-navigator-call.wav",
    },
    {
        "case": "case-008",
        "label": "Demo week voicemail",
        "voice": "verse",
        "input": "The demo landed really well. The bot handled the top questions and could take pressure off the phones before the next filing wave. I need a launch recommendation that is practical, not theoretical.",
        "instructions": "Sound like a real digital services director leaving a quick office voicemail after a product demo: upbeat but businesslike, mild room tone, natural pauses, not theatrical, not robotic.",
        "out": SITE / "public/media/case-008-demo-week-voicemail.wav",
    },
    {
        "case": "case-008",
        "label": "Navigator review",
        "voice": "coral",
        "input": "The scary part is how confident it sounds on deadlines. A claimant may not know to challenge it. If the bot is unsure, it has to get them to a person, not invent a clean rule.",
        "instructions": "Sound like a real legal aid navigator speaking during a review call: candid, concerned, steady, mild office background tone, not theatrical, not robotic.",
        "out": SITE / "public/media/case-008-navigator-review.wav",
    },
    {
        "case": "case-009",
        "label": "Fraud unit voicemail",
        "voice": "ash",
        "input": "If we move the hold line down, we catch more organized claims before money leaves. But adjudication is already stretched, so I need a threshold we can defend when legitimate payments wait.",
        "instructions": "Sound like a real program integrity director leaving a short morning voicemail: serious, measured, practical, light office tone, not announcer-like, not robotic.",
        "out": SITE / "public/media/case-009-fraud-unit-voicemail.wav",
    },
    {
        "case": "case-009",
        "label": "Hotline escalation",
        "voice": "verse",
        "input": "The angry calls are not all fraud misses. Some are people who submitted the same document twice because the portal lagged. When we release them two weeks later, the rent damage is already done.",
        "instructions": "Sound like a real hotline supervisor speaking during a training call: tired, practical, direct, mild call-center room tone, not theatrical, not robotic.",
        "out": SITE / "public/media/case-009-hotline-escalation.wav",
    },
    {
        "case": "case-010",
        "label": "Dashboard prep voicemail",
        "voice": "verse",
        "input": "The clearance metric finally tells a clean story: more claims handled digitally, fewer old backlogs. I need to know whether analytics is comfortable using it as the modernization headline.",
        "instructions": "Sound like a real chief performance officer leaving a concise evening voicemail: confident, polished but natural, mild office room tone, not theatrical, not robotic.",
        "out": SITE / "public/media/case-010-dashboard-prep-voicemail.wav",
    },
    {
        "case": "case-010",
        "label": "Caseworker callback",
        "voice": "ash",
        "input": "The dashboard says cleared, but my callback queue says not really. People come back after the bot link or the hold notice, and then we fix it manually under a different code.",
        "instructions": "Sound like a real senior claims caseworker speaking in an operations retrospective: candid, slightly weary, matter-of-fact, mild conference room tone, not announcer-like, not robotic.",
        "out": SITE / "public/media/case-010-caseworker-callback.wav",
    },
    {
        "case": "case-011",
        "label": "Research lead voice note",
        "voice": "coral",
        "input": "The headline is strong, but I am nervous that we mostly heard from portal users. If we slow this down, product will say we are ignoring customer voice.",
        "instructions": "Sound like a real customer research lead leaving a short office voice note: thoughtful, candid, slight deadline pressure, faint laptop and office background, natural pauses, not polished, not robotic.",
        "out": SITE / "public/media/case-011-research-lead-voice-note.wav",
    },
    {
        "case": "case-011",
        "label": "Call center callbacks",
        "voice": "ash",
        "input": "A few callers told us they did not trust the survey link or could not answer it in the portal. They still want self-service for simple things, but exceptions are when they need a person.",
        "instructions": "Sound like a real call-center supervisor speaking during a quick operations huddle: practical, grounded, slight call-center background tone, natural pacing, not theatrical, not robotic.",
        "out": SITE / "public/media/case-011-call-center-callbacks.wav",
    },
    {
        "case": "case-012",
        "label": "Board packet voice note",
        "voice": "verse",
        "input": "The discharge number is finally moving. If analytics agrees, I want to tell the board the workflow cut bed-ready delay by twenty-two percent across the network.",
        "instructions": "Sound like a real hospital operations vice president leaving a short board-prep voice note: confident, practical, mild office background, natural pauses, not theatrical, not robotic.",
        "out": SITE / "public/media/case-012-board-packet-voice-note.wav",
    },
    {
        "case": "case-012",
        "label": "Nurse supervisor handoff",
        "voice": "coral",
        "input": "The navigator checklist is helping us start earlier, but families still wait on pharmacy and transport. Ready on that screen does not always mean the patient can leave.",
        "instructions": "Sound like a real hospital unit supervisor speaking in a quick discharge huddle: candid, busy clinical office background, grounded, natural rhythm, not polished, not robotic.",
        "out": SITE / "public/media/case-012-nurse-supervisor-handoff.wav",
    },
    {
        "case": "case-013",
        "label": "Quality committee voicemail",
        "voice": "verse",
        "input": "The report says risk is stable once incomplete charts are dropped. If that is solid, I want the committee to focus on treatment timing and not reopen intake documentation again.",
        "instructions": "Sound like a real hospital quality director leaving a short office voicemail before a committee meeting: measured, practical, slight deadline pressure, mild hospital office background, not theatrical, not robotic.",
        "out": SITE / "public/media/case-013-quality-committee-voicemail.wav",
    },
    {
        "case": "case-013",
        "label": "Triage nurse handoff",
        "voice": "coral",
        "input": "Overnight, we get vitals first and labs later if the hallway is full. A quiet chart is not always low-risk. Sometimes nobody had a clean moment to finish the screen.",
        "instructions": "Sound like a real emergency department triage nurse speaking in a quick handoff: candid, slightly tired, steady, faint unit background tone, natural pauses, not polished, not robotic.",
        "out": SITE / "public/media/case-013-triage-nurse-handoff.wav",
    },
    {
        "case": "case-014",
        "label": "Grant deadline voicemail",
        "voice": "verse",
        "input": "The university team says the file has no names, no addresses, and only shifted dates. If privacy is comfortable, I need to release it this week so the grant milestone does not slip.",
        "instructions": "Sound like a real public health program director leaving a short office voicemail: controlled, practical, slight grant-deadline pressure, mild office background, not theatrical, not robotic.",
        "out": SITE / "public/media/case-014-grant-deadline-voicemail.wav",
    },
    {
        "case": "case-014",
        "label": "Community partner warning",
        "voice": "coral",
        "input": "In a small tract, shelter, release month, and outreach visit is enough for people to guess who it is. The file may be name-free, but the story is not anonymous here.",
        "instructions": "Sound like a real community services director speaking in a quick call: candid, protective of clients, grounded, faint office background, natural pauses, not polished, not robotic.",
        "out": SITE / "public/media/case-014-community-partner-warning.wav",
    },
    {
        "case": "case-015",
        "label": "Board deck voicemail",
        "voice": "verse",
        "input": "The chart finally shows the intake model bending the line. If analytics is comfortable, I want the board slide to say failures were cut nearly in half.",
        "instructions": "Sound like a real nonprofit executive leaving a short board-prep voicemail: confident but pragmatic, mild office background, slight deadline pressure, not theatrical, not robotic.",
        "out": SITE / "public/media/case-015-board-deck-voicemail.wav",
    },
    {
        "case": "case-015",
        "label": "Analyst caveat note",
        "voice": "ash",
        "input": "The crop makes the month-to-month movement look bigger than it is. I would still show the improvement, but pair it with counts, the denominator change, and the threshold we said would matter.",
        "instructions": "Sound like a real data analyst speaking during a deck review: calm, precise, practical, slight laptop microphone compression, not announcer-like, not robotic.",
        "out": SITE / "public/media/case-015-analyst-caveat-note.wav",
    },
    {
        "case": "case-016",
        "label": "Agency winner voicemail",
        "voice": "verse",
        "input": "The treated markets beat control by eleven percent, and the agency wants approval to scale nationally. Unless there is a design blocker, I need a yes or no before media buys lock.",
        "instructions": "Sound like a real growth director leaving a short campaign-readout voicemail: brisk, confident, deadline pressure, mild office background, not theatrical, not robotic.",
        "out": SITE / "public/media/case-016-agency-winner-voicemail.wav",
    },
    {
        "case": "case-016",
        "label": "Field sales spillover note",
        "voice": "ash",
        "input": "The border stores are messy. Shoppers saw the test ads on regional TV, some control stores got the same endcap, and our reps moved inventory between territories when demand spiked.",
        "instructions": "Sound like a real regional sales operations lead speaking in a practical field huddle: candid, matter-of-fact, slight conference-room audio, not announcer-like, not robotic.",
        "out": SITE / "public/media/case-016-field-sales-spillover-note.wav",
    },
    {
        "case": "case-017",
        "label": "Policy brief voicemail",
        "voice": "verse",
        "input": "The pilot counties improved five points more than the comparison counties after launch. If analytics is comfortable, we want to say the program caused the employment gain.",
        "instructions": "Sound like a real state workforce policy director leaving a concise office voicemail before a legislative briefing: measured, deadline pressure, practical, mild office background, not theatrical, not robotic.",
        "out": SITE / "public/media/case-017-policy-brief-voicemail.wav",
    },
    {
        "case": "case-017",
        "label": "Local workforce note",
        "voice": "coral",
        "input": "The employer network was already warming up before the official launch. A few manufacturers started hiring again in March, and some counties started referrals before the policy date on the slide.",
        "instructions": "Sound like a real local workforce board director speaking in a quick call: candid, grounded, slightly wary of overclaiming, faint office background, natural pauses, not polished, not robotic.",
        "out": SITE / "public/media/case-017-local-workforce-note.wav",
    },
    {
        "case": "case-018",
        "label": "Budget request voicemail",
        "voice": "verse",
        "input": "The cutoff analysis is exactly what budget staff asked for. Households above seventy did much better, so I want to say the navigator prevented evictions.",
        "instructions": "Sound like a real county housing program director leaving a short budget-prep voicemail: measured, confident, deadline pressure, mild office background, not theatrical, not robotic.",
        "out": SITE / "public/media/case-018-program-director-voicemail.wav",
    },
    {
        "case": "case-018",
        "label": "Navigator intake note",
        "voice": "coral",
        "input": "Around the cutoff, we ask people to bring the missing pay stub or court notice before we lock the file. The first score is not always the real situation, but yes, staff know seventy is the line.",
        "instructions": "Sound like a real frontline housing navigator speaking in a practical team huddle: candid, grounded, faint nonprofit office background, natural pacing, not polished, not robotic.",
        "out": SITE / "public/media/case-018-intake-navigator-note.wav",
    },
    {
        "case": "case-019",
        "label": "Null result voicemail",
        "voice": "verse",
        "input": "The p-value missed, so I think we can say QuickStart has no measurable impact and move on. I need that written cleanly for launch review.",
        "instructions": "Sound like a real product lead leaving a short launch-review voicemail: practical, slightly hurried, confident but not theatrical, mild office background, natural pauses, not robotic.",
        "out": SITE / "public/media/case-019-product-lead-voicemail.wav",
    },
    {
        "case": "case-019",
        "label": "Analyst caveat",
        "voice": "ash",
        "input": "I would call this inconclusive, not flat. The exposed sample was a fraction of plan, and the interval still includes the lift product said would matter.",
        "instructions": "Sound like a real experimentation analyst speaking during an internal review call: calm, precise, matter-of-fact, slight laptop microphone compression, not announcer-like, not robotic.",
        "out": SITE / "public/media/case-019-analyst-caveat.wav",
    },
    {
        "case": "case-020",
        "label": "Growth launch voicemail",
        "voice": "verse",
        "input": "FastStart is the first checkout test this quarter with a clean paid-start lift. If analytics is comfortable, I want to call it a growth win and roll it out globally.",
        "instructions": "Sound like a real subscription growth lead leaving a short launch-review voicemail: confident, deadline pressure, practical, mild office background, not theatrical, not robotic.",
        "out": SITE / "public/media/case-020-growth-lead-voicemail.wav",
    },
    {
        "case": "case-020",
        "label": "Support queue note",
        "voice": "coral",
        "input": "A lot of the FastStart contacts are not confused about the app. They say the annual offer felt urgent, then they regret it once the renewal email lands.",
        "instructions": "Sound like a real billing support manager speaking during a team huddle: candid, slightly busy support-office background, grounded, natural pacing, not polished, not robotic.",
        "out": SITE / "public/media/case-020-support-queue-note.wav",
    },
    {
        "case": "case-021",
        "label": "Launch review voicemail",
        "voice": "verse",
        "input": "The readmission model is the best one we have ever seen. If the AUC is really above ninety, I want it in the discharge workflow next month.",
        "instructions": "Sound like a real hospital population health director leaving a short launch-review voicemail: confident, practical, mild office background, not theatrical, not robotic.",
        "out": SITE / "public/media/case-021-pop-health-voicemail.wav",
    },
    {
        "case": "case-021",
        "label": "Data engineering caveat",
        "voice": "ash",
        "input": "The validation table is a retrospective snapshot. It has the cleanest version of the encounter, plus follow-up fields. That is not the same table we can score from at discharge.",
        "instructions": "Sound like a real data engineering lead speaking during a feature-store review: calm, precise, laptop mic, light office background, natural pacing, not robotic.",
        "out": SITE / "public/media/case-021-data-engineering-caveat.wav",
    },
    {
        "case": "case-022",
        "label": "Benchmark launch voicemail",
        "voice": "verse",
        "input": "The model finally gives us a clean benchmark story. If we can say it beats the rules engine by this much, I want high-confidence auto-removal live before the listing surge.",
        "instructions": "Sound like a real trust and safety product lead leaving a short launch-planning voicemail: focused, deadline pressure, mild office background, natural pacing, not theatrical, not robotic.",
        "out": SITE / "public/media/case-022-benchmark-launch-voicemail.wav",
    },
    {
        "case": "case-022",
        "label": "Policy caveat",
        "voice": "coral",
        "input": "Some of these examples were labeled under old guidance. The coded harassment cases especially are not just hard for the model. They are hard because the vendor packet is behind the current policy.",
        "instructions": "Sound like a real trust and safety policy lead speaking in a review call: calm, slightly concerned, precise, light laptop microphone sound, not polished, not robotic.",
        "out": SITE / "public/media/case-022-policy-caveat.wav",
    },
    {
        "case": "case-023",
        "label": "Peak week drift voicemail",
        "voice": "verse",
        "input": "If aggregate SLA hasn't breached, can we mark the drift alert as a known issue until peak week is over? I don't want the dashboard spooking support and ops.",
        "instructions": "Sound like a real logistics product lead leaving a short operations voicemail: practical, time pressure, mild office background, natural, not theatrical, not robotic.",
        "out": SITE / "public/media/case-023-peak-week-drift-voicemail.wav",
    },
    {
        "case": "case-023",
        "label": "Ownership caveat",
        "voice": "ash",
        "input": "Everyone thinks someone else owns this. Data science says the monitor fired, MLOps says the pipeline is green, and operations says they cannot change promise windows without product.",
        "instructions": "Sound like a real operations analytics lead speaking in a model incident standup: measured, slightly frustrated, precise, laptop mic, light office background, not robotic.",
        "out": SITE / "public/media/case-023-ownership-caveat.wav",
    },
    {
        "case": "case-024",
        "label": "Holiday override voicemail",
        "voice": "verse",
        "input": "If the forecast is under ten percent error, I want planner overrides on for the holiday push. We cannot go into next week still debating every store order by hand.",
        "instructions": "Sound like a real retail operations VP leaving a short planning voicemail: decisive, time pressure, mild office background, natural pacing, not theatrical, not robotic.",
        "out": SITE / "public/media/case-024-holiday-override-voicemail.wav",
    },
    {
        "case": "case-024",
        "label": "Planner caveat",
        "voice": "coral",
        "input": "The model thinks those stores only sell ninety bottles because ninety is all we gave them. When we had extra cases in the back, they moved through them in a day.",
        "instructions": "Sound like a real senior replenishment planner speaking in a review call: practical, experienced, slightly skeptical, light office background, not polished, not robotic.",
        "out": SITE / "public/media/case-024-planner-caveat.wav",
    },
    {
        "case": "case-025",
        "label": "Copilot launch voicemail",
        "voice": "verse",
        "input": "The account managers love it. If the clean-task score is above ninety, I want the tool-enabled pilot opened up before renewal season starts.",
        "instructions": "Sound like a real revenue operations lead leaving a short launch-planning voicemail: upbeat, deadline pressure, practical, mild office background, not theatrical, not robotic.",
        "out": SITE / "public/media/case-025-copilot-launch-voicemail.wav",
    },
    {
        "case": "case-025",
        "label": "Security caveat",
        "voice": "ash",
        "input": "The issue is not whether the assistant sounds helpful. It can read untrusted text and then use tools. Until those are separated, the pilot score is not a launch-readiness score.",
        "instructions": "Sound like a real application security lead speaking in a review call: calm, firm, precise, laptop mic, light office background, not robotic.",
        "out": SITE / "public/media/case-025-security-caveat.wav",
    },
]


def load_local_api_key() -> None:
    if os.environ.get("OPENAI_API_KEY"):
        return

    env_file = SITE.parents[1] / ".env.rtf"
    if not env_file.exists():
        return

    text = env_file.read_text(errors="ignore")
    match = re.search(r"(sk-proj-[A-Za-z0-9_-]+|sk-[A-Za-z0-9_-]+)", text)
    if match:
        os.environ["OPENAI_API_KEY"] = match.group(1)


def generate_speech(client: OpenAI, clip: dict[str, object], raw_path: Path) -> None:
    response = client.audio.speech.create(
        model="gpt-4o-mini-tts",
        voice=str(clip["voice"]),
        input=str(clip["input"]),
        instructions=str(clip["instructions"]),
        response_format="wav",
    )
    raw_path.parent.mkdir(parents=True, exist_ok=True)
    response.write_to_file(raw_path)


def read_wav(path: Path):
    with wave.open(str(path), "rb") as wav:
        params = wav.getparams()
        frames = wav.readframes(params.nframes)
    if params.sampwidth != 2:
        raise ValueError(f"Expected 16-bit PCM WAV, got sample width {params.sampwidth}")
    samples = list(struct.unpack("<" + "h" * (len(frames) // 2), frames))
    return params, samples


def write_wav(path: Path, params, samples: list[int]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    frames = struct.pack("<" + "h" * len(samples), *samples)
    with wave.open(str(path), "wb") as wav:
        wav.setnchannels(params.nchannels)
        wav.setsampwidth(params.sampwidth)
        wav.setframerate(params.framerate)
        wav.writeframes(frames)


def add_room_tone(params, samples: list[int], *, seed: int) -> list[int]:
    rng = random.Random(seed)
    channels = params.nchannels
    sample_rate = params.framerate
    total_frames = len(samples) // channels
    mixed = samples[:]

    noise_state = 0.0
    for frame_index in range(total_frames):
        time = frame_index / sample_rate
        low_hum = 70 * math.sin(2 * math.pi * 60 * time)
        noise_state = 0.985 * noise_state + rng.uniform(-1.0, 1.0) * 8
        tone = int(low_hum + noise_state)
        for channel in range(channels):
            idx = frame_index * channels + channel
            mixed[idx] = max(-32768, min(32767, mixed[idx] + tone))

    for second in (1.2, 3.6, 6.4, 9.1):
        start = int(second * sample_rate)
        for offset in range(int(0.024 * sample_rate)):
            frame_index = start + offset
            if frame_index >= total_frames:
                break
            envelope = 1.0 - (offset / max(1, int(0.024 * sample_rate)))
            tick = int(rng.uniform(-380, 380) * envelope)
            for channel in range(channels):
                idx = frame_index * channels + channel
                mixed[idx] = max(-32768, min(32767, mixed[idx] + tick))

    return mixed


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--case", choices=sorted({clip["case"] for clip in CLIPS}), required=True)
    args = parser.parse_args()

    load_local_api_key()
    client = OpenAI()
    selected = [clip for clip in CLIPS if clip["case"] == args.case]
    for index, clip in enumerate(selected):
        raw_path = TMP / f"{clip['case']}-{clip['label'].lower().replace(' ', '-')}-raw.wav"
        print(f"Generating speech: {clip['case']} / {clip['label']}")
        generate_speech(client, clip, raw_path)
        params, samples = read_wav(raw_path)
        mixed = add_room_tone(params, samples, seed=2200 + index)
        write_wav(Path(clip["out"]), params, mixed)
        print(f"Wrote {clip['out']}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

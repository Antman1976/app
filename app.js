
const STORAGE_KEYS = {
  activeWeek: "vj-active-week",
  activeDay: "vj-active-day",
  checks: "vj-checks",
  sessionNotes: "vj-session-notes",
  weeklyProgress: "vj-weekly-progress",
  tmNote: "vj-tm-note"
};

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const DAY_KEYS = ["mon", "tue", "wed", "thu", "fri", "sat"];

const monthDefinitions = [
  { month: 1, weeks: [1, 2, 3, 4], title: "Month 1 • Volume Building", split: { low: 35, max: 5 }, theme: "General work and tissue tolerance." },
  { month: 2, weeks: [5, 6, 7, 8], title: "Month 2 • Intensification & Specificity", split: { low: 30, max: 10 }, theme: "Specific power and moderate loading." },
  { month: 3, weeks: [9, 10, 11, 12], title: "Month 3 • Absolute Strength & Eccentric Priming", split: { low: 25, max: 15 }, theme: "Heavy squats, heavy pulls, eccentric prep." },
  { month: 4, weeks: [13, 14, 15, 16], title: "Month 4 • Moving Bars Fast & Eccentrics", split: { low: 20, max: 20 }, theme: "Fast bar speed and overload eccentrics." },
  { month: 5, weeks: [17, 18, 19, 20], title: "Month 5 • Speed Strength & Shock Loading", split: { low: 20, max: 20 }, theme: "Fast intent, shock work, and regeneration." },
  { month: 6, weeks: [21, 22, 23, 24], title: "Month 6 • Peak Specificity", split: { low: 20, max: 20 }, theme: "Jump and sprint performance first." }
];

function ex(name, sets, reps, intensity = "", note = "") {
  return { name, sets, reps, intensity, note };
}

function jumpTemplate(kind, split, details = []) {
  return {
    title: kind,
    type: "Jump / General",
    focus: `${split.low} min low-effort jumping, ${split.max} min max-effort jumping.`,
    jumpSplit: split,
    exercises: details
  };
}

function buildWeek(week) {
  if (week <= 4) return buildMonth1Week(week);
  if (week <= 8) return buildMonth2Week(week);
  if (week <= 12) return buildMonth3Week(week);
  if (week <= 16) return buildMonth4Week(week);
  if (week <= 20) return buildMonth5Week(week);
  return buildMonth6Week(week);
}

function getMonthMeta(week) {
  return monthDefinitions.find(def => def.weeks.includes(week));
}

function buildMonth1Week(week) {
  const pct = { 1: "65%", 2: "67.5%", 3: "70%", 4: "60-65%" }[week];
  const deload = week === 4;
  const split = { low: 35, max: 5 };
  return {
    week,
    month: 1,
    title: "Month 1 • Volume Building",
    summary: deload ? "Deload week. Cut total work by roughly half and keep everything easy and crisp." : "Build work capacity, tolerance, and base strength with low-specificity work.",
    jumpSplit: split,
    deload,
    days: [
      {
        day: "Monday",
        short: "Lift A",
        type: "Lift",
        focus: "Power exercise first, then squat volume and general strength.",
        exercises: [
          ex("Hang Power Clean", deload ? "3" : "5", "4", pct, "Fast bar speed only."),
          ex("Back Squat", deload ? "3" : "4", deload ? "6" : "8", pct),
          ex("Romanian Deadlift", deload ? "2" : "3", deload ? "8" : "10"),
          ex("Bulgarian Split Squat", deload ? "2" : "3", "8/leg"),
          ex("Standing Calf Raise", deload ? "2" : "4", "12"),
          ex("Hanging Knee Raise", deload ? "2" : "3", "12"),
          ex("Plank", deload ? "2" : "3", week === 3 ? "60 sec" : "45 sec")
        ]
      },
      jumpTemplate("Jump + General", split, [
        ex("Pogo Hops", "3", "20"),
        ex("Line Hops", "3", "20 each direction"),
        ex("Snap-Down to Stick", "3", "5"),
        ex("Low Box Jump", "4", "3"),
        ex("Easy Approach Jumps", week === 2 ? "8" : "6", "total"),
        ex("Max Standing Vertical Jumps", week === 3 ? "5" : "4", "total"),
        ex("Max Approach Jumps", week === 3 ? "5" : "4", "total"),
        ex("Backward Sled Drag", deload ? "4" : "6", "20 m"),
        ex("Farmer Carry", deload ? "2" : "3", "30 m"),
        ex("Push-Ups", deload ? "2" : "3", deload ? "12" : "15"),
        ex("Inverted Rows", deload ? "2" : "3", deload ? "10" : "12"),
        ex("Medball Chest Pass", deload ? "2" : "3", "8")
      ]),
      {
        day: "Wednesday",
        short: "Lift B",
        type: "Lift",
        focus: "Upper-body power plus front squat and unilateral strength.",
        exercises: [
          ex("Push Press", deload ? "3" : "5", "4", pct),
          ex("Front Squat", deload ? "3" : "4", deload ? "6" : "8", pct),
          ex("Barbell Hip Thrust", deload ? "2" : "4", deload ? "8" : "10"),
          ex("Reverse Lunge", deload ? "2" : "3", deload ? "8/leg" : "10/leg"),
          ex("DB Bench Press", deload ? "2" : "3", "10"),
          ex("Chest-Supported Row", deload ? "2" : "3", "10"),
          ex("Pallof Press", deload ? "2" : "3", "12/side")
        ]
      },
      jumpTemplate("Jump + Tempo / Circuit", split, [
        ex("Pogo Hops", "3", "20"),
        ex("Snap-Down to Stick", "3", "5"),
        ex("Easy Jump Technique Touches", deload ? "4" : "6", "total"),
        ex("Tempo Runs", deload ? "6" : (week === 3 ? "8" : "10"), week === 3 ? "120 m @ 65-70%" : (deload ? "80 m easy" : "100 m @ 60-70%")),
        ex("Goblet Squat", deload ? "2" : "3", "12"),
        ex("DB RDL", deload ? "2" : "3", "12"),
        ex("Push-Ups", deload ? "2" : "3", "12"),
        ex("Pull-Ups / Assisted Pull-Ups", deload ? "2" : "3", deload ? "6-8" : "8"),
        ex("Back Extension", deload ? "2" : "3", "15"),
        ex("Side Plank", deload ? "2" : "3", "30 sec/side")
      ]),
      {
        day: "Friday",
        short: "Lift C",
        type: "Lift",
        focus: "Additional pull and squat volume with posterior-chain support.",
        exercises: [
          ex("High Pull from Hang", deload ? "3" : "5", "4", pct),
          ex("Pause Back Squat", deload ? "3" : "4", deload ? "6" : "8", pct, "Pause 2 seconds in the hole."),
          ex("Good Morning", deload ? "2" : "3", "8"),
          ex("Step-Up", deload ? "2" : "3", week === 3 ? "8-10/leg" : "10/leg"),
          ex("Seated Calf Raise", deload ? "2" : "4", "15"),
          ex("Ab Wheel", deload ? "2" : "3", week === 3 ? "10-12" : "10"),
          ex("Band Pull-Aparts", deload ? "2" : "3", "20")
        ]
      },
      {
        day: "Saturday",
        short: "Optional Recovery",
        type: "Recovery",
        focus: "Easy recovery only.",
        exercises: [
          ex("Easy Walk / Bike", "1", "20-30 min"),
          ex("Hip Mobility", "1", "10 min"),
          ex("Ankle Mobility", "1", "10 min"),
          ex("Light Core", "1", "5-10 min")
        ]
      }
    ]
  };
}

function buildMonth2Week(week) {
  const i = week - 4;
  const backSquatPct = { 1: "75%", 2: "77.5%", 3: "80%", 4: "70%" }[i];
  const frontSquatPct = { 1: "75%", 2: "77.5%", 3: "80%", 4: "70%" }[i];
  const powerCleanPct = { 1: "75%", 2: "77.5%", 3: "80-82.5%", 4: "70%" }[i];
  const blockPullPct = { 1: "90%", 2: "92.5%", 3: "95%", 4: "85%" }[i];
  const cleanPullPct = { 1: "90%", 2: "90%", 3: "92.5%", 4: "85%" }[i];
  const pauseSqPct = { 1: "77%", 2: "80%", 3: "82%", 4: "70%" }[i];
  const deload = i === 4;
  const split = { low: 30, max: 10 };
  return {
    week,
    month: 2,
    title: "Month 2 • Intensification & Specificity",
    summary: deload ? "Deload week. Fewer sets, easier tempo, and reduced jump contacts." : "Shift into more specific power work with moderate intensities and cleaner movement quality.",
    jumpSplit: split,
    deload,
    days: [
      {
        day: "Monday",
        short: "Lift A",
        type: "Lift",
        focus: "Heavy clean pull emphasis with moderate squat work.",
        exercises: [
          ex("Clean Pull", deload ? "3" : "6", "3", cleanPullPct, "Base this off your power clean max."),
          ex("Back Squat", deload ? "3" : "4", deload ? "5" : "6", backSquatPct),
          ex("Romanian Deadlift", deload ? "2" : "3", "8"),
          ex("DB Walking Lunge", deload ? "2" : "3", "8/leg"),
          ex("Nordic Curl", deload ? "2" : "3", deload ? "4" : (i === 3 ? "5-6" : "4-5")),
          ex("Standing Calf Raise", deload ? "2" : "4", "10"),
          ex("Cable Chop", deload ? "2" : "3", "10/side")
        ]
      },
      jumpTemplate("Jump + Bodybuilding / Tempo", split, [
        ex("Pogo Hops", "3", "20"),
        ex("Low Hurdle Hops", "3", "5"),
        ex("Penultimate Drills", "3", "4"),
        ex("Easy Broad Jumps", "3", "3"),
        ex("Easy Approach Jumps", "6", "total"),
        ex("Max Approach Jumps", deload ? "4" : (i >= 2 ? "7" : "6"), "total"),
        ex("Max Standing Vertical Jumps", deload ? "3" : "4", "total"),
        ex("DB Bench Press", deload ? "2" : "3-4", "12"),
        ex("Chest-Supported Row", deload ? "2" : "3-4", "12"),
        ex("Lateral Raise", deload ? "2" : "3", "15"),
        ex("Hamstring Curl", deload ? "2" : "3", "12"),
        ex("Split Squat", deload ? "2" : "3", "10/leg"),
        ex("Push-Up", deload ? "2" : "3", "15"),
        ex("Biceps Curl", deload ? "2" : "3", "12"),
        ex("Triceps Pressdown", deload ? "2" : "3", "12"),
        ex("Tempo Runs", deload ? "6" : "8", deload ? "80 m easy" : "100 m @ 65-70%")
      ]),
      {
        day: "Wednesday",
        short: "Lift B",
        type: "Lift",
        focus: "Power clean technique and front squat strength.",
        exercises: [
          ex("Power Clean", deload ? "3" : "5", "3", powerCleanPct),
          ex("Front Squat", deload ? "3" : "4", deload ? "5" : "6", frontSquatPct),
          ex("Hip Thrust", deload ? "2" : "3", "8"),
          ex("Rear-Foot Elevated Split Squat", deload ? "2" : "3", "8/leg"),
          ex("DB Incline Press", deload ? "2" : "3", "8-10"),
          ex("Pull-Ups / Lat Pulldown", deload ? "2" : "3", "8-10"),
          ex("Pallof Press", deload ? "2" : "3", "12/side")
        ]
      },
      jumpTemplate("Jump + Tempo / Circuit", split, [
        ex("Pogo Hops", "3", "20"),
        ex("Easy Technique Jumps", deload ? "4" : "6", "total"),
        ex("Max Approach Jumps", deload ? "4" : "6", "total"),
        ex("Tempo Runs", deload ? "6" : (i === 3 ? "8" : "6"), deload ? "80 m easy" : (i === 3 ? "120 m @ 70%" : "150 m @ 65-70%")),
        ex("Goblet Squat", deload ? "2" : "3", "12"),
        ex("DB RDL", deload ? "2" : "3", "12"),
        ex("Medball Slam", deload ? "2" : "3", "10"),
        ex("Push-Ups", deload ? "2" : "3", "12"),
        ex("Inverted Row", deload ? "2" : "3", "12"),
        ex("Copenhagen Plank", deload ? "2" : "3", "20 sec/side")
      ]),
      {
        day: "Friday",
        short: "Lift C",
        type: "Lift",
        focus: "Block pull and pause squat day.",
        exercises: [
          ex("Clean Pull from Blocks", deload ? "3" : "5", "3", blockPullPct),
          ex("Pause Back Squat", deload ? "3" : "4", deload ? "5" : "6", pauseSqPct),
          ex("Good Morning", deload ? "2" : "3", i === 3 ? "6" : "6-8"),
          ex("Step-Up", deload ? "2" : "3", "8/leg"),
          ex("Seated Calf Raise", deload ? "2" : "4", "12"),
          ex("Ab Wheel", deload ? "2" : "3", i === 2 ? "10" : "10-12")
        ]
      },
      {
        day: "Saturday",
        short: "Optional Recovery",
        type: "Recovery",
        focus: "Keep it light.",
        exercises: [
          ex("Easy Walk / Bike", "1", "20-30 min"),
          ex("Mobility", "1", "10-15 min"),
          ex("Breathing / Relaxation", "1", "5 min")
        ]
      }
    ]
  };
}

function buildMonth3Week(week) {
  const i = week - 8;
  const deload = i === 4;
  const split = { low: 25, max: 15 };
  const cleanPullA = { 1: "105%", 2: "107.5%", 3: "110%", 4: "95%" }[i];
  const backA = { 1: "85%", 2: "86-87%", 3: "88%", 4: "75-80%" }[i];
  const powerClean = { 1: "80%", 2: "82.5%", 3: "85%", 4: "75%" }[i];
  const frontSquat = { 1: "82%", 2: "84%", 3: "86%", 4: "75%" }[i];
  const cleanPullB = { 1: "105%", 2: "107.5%", 3: "110%", 4: "95%" }[i];
  const backB = { 1: "88%", 2: "89%", 3: "90%", 4: "78%" }[i];
  return {
    week,
    month: 3,
    title: "Month 3 • Absolute Strength & Eccentric Priming",
    summary: deload ? "Deload week. Keep a few heavy-feeling touches, but cut volume and contacts." : "The hardest strength block. Heavy squats, overloaded pulls, and eccentric prep for the next phase.",
    jumpSplit: split,
    deload,
    days: [
      {
        day: "Monday",
        short: "Lift A",
        type: "Lift",
        focus: "Heavy pull and dense back squat volume.",
        exercises: [
          ex("Clean Pull", deload ? "3" : "5", deload ? "2" : "3", cleanPullA),
          ex("Back Squat", deload ? "4" : "10", "2", backA),
          ex("Romanian Deadlift", deload ? "2" : "4", deload ? "6" : (i === 3 ? "5-6" : "6")),
          ex("Nordic Curl", deload ? "2" : "4", i === 3 ? "4-5" : "4"),
          ex("Standing Calf Raise", deload ? "2" : "4", deload ? "10" : "8 heavy"),
          ex("Weighted Plank", deload ? "2" : "3", i >= 2 ? "45 sec" : "40 sec")
        ]
      },
      jumpTemplate("Jump + Tempo / General", split, [
        ex("Sand Pogo Hops", "3", "20"),
        ex("Sand Broad Jumps", "3", "3"),
        ex("Sand Bounds", "3", "10 m"),
        ex("Low Box Landings", "3", "5"),
        ex("Max Standing or Approach Jumps", deload ? "4-6" : (i === 3 ? "8-10" : "8"), "total"),
        ex("Tempo Runs", deload ? "4-6" : "6", deload ? "100-150 m easy" : "200 m @ 70%"),
        ex("Medball Scoop Toss", deload ? "2" : "4", "5"),
        ex("Backward Sled Drag", deload ? "3" : "5", "25 m"),
        ex("Mobility / Tissue Work", "1", "15 min")
      ]),
      {
        day: "Wednesday",
        short: "Lift B",
        type: "Lift",
        focus: "Clean technique under fatigue and front squat strength.",
        exercises: [
          ex("Power Clean", deload ? "3" : "6", "2", powerClean),
          ex("Front Squat", deload ? "3" : "6", "3", frontSquat),
          ex("Eccentric Split Squat", deload ? "2" : "3", i === 3 ? "5/leg" : "6/leg", "", "Lower for 4 seconds."),
          ex("Hip Thrust", deload ? "2" : "3", i >= 2 ? "6" : "6-8"),
          ex("DB Row", deload ? "2" : "3", "8"),
          ex("DB Bench", deload ? "2" : "3", "8"),
          ex("Hanging Leg Raise", deload ? "2" : "3", "10")
        ]
      },
      jumpTemplate("Jump + Sand Circuit / Tempo", split, [
        ex("Sand Jump Circuit", deload ? "2" : "3", "rounds", "", "Squat jump x5, broad jump x4, bounds x10 m, stick landing x4."),
        ex("Tempo Runs", deload ? "4-6" : (i === 1 ? "8" : "6-8"), deload ? "100-120 m easy" : (i === 1 ? "120 m @ 70%" : "120-150 m @ 70%")),
        ex("Easy Upper-Body Pump Circuit", deload ? "1-2" : "2-3", "rounds")
      ]),
      {
        day: "Friday",
        short: "Lift C",
        type: "Lift",
        focus: "Heavy pull and heavy doubles to drive absolute strength.",
        exercises: [
          ex("Clean Pull", deload ? "3" : "5", "2", cleanPullB),
          ex("Back Squat", deload ? "4" : "8", "2", backB),
          ex("Pause RDL", deload ? "2" : "3", "5", "", "Pause just below the knee."),
          ex("Nordic Curl", deload ? "2" : "3", "4"),
          ex("Seated Calf Raise", deload ? "2" : "4", "10"),
          ex("Ab Wheel", deload ? "2" : "3", i === 3 ? "10" : "8-10")
        ]
      },
      {
        day: "Saturday",
        short: "Optional Recovery",
        type: "Recovery",
        focus: "Use this day for recovery only.",
        exercises: [
          ex("Walk / Easy Bike", "1", "20-30 min"),
          ex("Mobility", "1", "10-15 min"),
          ex("Soft Tissue / Relaxation", "1", "5-10 min")
        ]
      }
    ]
  };
}

function buildMonth4Week(week) {
  const i = week - 12;
  const deload = i === 4;
  const split = { low: 20, max: 20 };
  const clean = { 1: "85%", 2: "87-88%", 3: "90-92%", 4: "75-80%" }[i];
  const ecc = { 1: "110%", 2: "112%", 3: "115%", 4: "70% or easy tempo squat" }[i];
  const clean2 = { 1: "78%", 2: "80-82%", 3: "82-85%", 4: "70-75%" }[i];
  const front = { 1: "80%", 2: "82%", 3: "84-85%", 4: "70%" }[i];
  const shrug = { 1: "75%", 2: "80%", 3: "82-85%", 4: "light" }[i];
  return {
    week,
    month: 4,
    title: "Month 4 • Moving Bars Fast & Eccentrics",
    summary: deload ? "Deload week. Drop overload eccentric work and cut jump contacts." : "Fast bars, heavy eccentric loading, and more jump-specific elastic work.",
    jumpSplit: split,
    deload,
    days: [
      {
        day: "Monday",
        short: "Lift A",
        type: "Lift",
        focus: "Heavy-fast power clean work and overload eccentrics.",
        exercises: [
          ex("Power Clean", deload ? "3" : (i === 3 ? "5-6" : "6"), i === 3 && !deload ? "1" : "2", clean, deload ? "" : "Fast, no misses."),
          ex("Accentuated Eccentric Back Squat", deload ? "3" : "4", deload ? "3" : "2", ecc, deload ? "Use easy tempo squat if needed." : "Use a 4-5 second lowering and assisted concentric."),
          ex("Drop RDL", deload ? "2" : "3", "5"),
          ex("High-Velocity Calf Raise", deload ? "2" : "4", "10"),
          ex("Box Jump", deload ? "2" : "4", "3"),
          ex("Side Plank", deload ? "2" : "3", "30 sec/side")
        ]
      },
      jumpTemplate("Jump + Medball / General", split, [
        ex("Pogo Hops", "3", "20"),
        ex("Snap-Downs", "3", "5"),
        ex("Low Hurdle Hops", "3", "4"),
        ex("Easy Approach Work", "1", "10 min"),
        ex("Max Approach Jumps", deload ? "4" : "6", "total"),
        ex("Max Standing Jumps", deload ? "3" : "4", "total"),
        ex("Dunk Attempts", deload ? "0-2" : "2-4", "optional"),
        ex("Medball Overhead Throw", deload ? "2" : "4", "5"),
        ex("Medball Scoop Toss", deload ? "2" : "4", "5"),
        ex("Backward Sled Drag", deload ? "2-3" : "4", "20 m"),
        ex("Mobility / Ankle Work", "1", "15 min")
      ]),
      {
        day: "Wednesday",
        short: "Lift B",
        type: "Lift",
        focus: "More jump-specific clean variation and front squat work.",
        exercises: [
          ex("Power Clean from Floor or Blocks", deload ? "3" : "6", "2", clean2, "One-foot jumpers can bias blocks."),
          ex("Front Squat", deload ? "3" : "5", "3", front),
          ex("Rear-Foot Elevated Split Squat", deload ? "2" : "3", "5/leg"),
          ex("Hip Thrust", deload ? "2" : "3", "5-6"),
          ex("Reactive Pogos", deload ? "2" : "3", "20"),
          ex("Pallof Press", deload ? "2" : "3", "10/side")
        ]
      },
      jumpTemplate("Jump + Elastic Session", split, [
        ex("Low Hurdle Hops", deload ? "2" : "4", deload ? "3" : "4"),
        ex("Box Drop to Stick", deload ? "0-2" : "4", "3"),
        ex("Single-Leg Line Hops", deload ? "2" : "3", "10/leg"),
        ex("Easy Tempo", deload ? "1" : "6", deload ? "Walk / easy bike" : "80 m @ 60-65%"),
        ex("Mobility", "1", "15 min")
      ]),
      {
        day: "Friday",
        short: "Lift C",
        type: "Lift",
        focus: "Explosive pull plus another eccentric exposure.",
        exercises: [
          ex("Jump Shrug or Snatch Pull", deload ? "3" : "5", "3", shrug),
          ex("Accentuated Eccentric Squat", deload ? "2-3" : "3", deload ? "3" : "2", ecc),
          ex("Single-Leg RDL", deload ? "2" : "3", "6/leg"),
          ex("Seated Calf Raise", deload ? "2" : "4", "10"),
          ex("Depth Landing", deload ? "0-2" : "3", "3"),
          ex("Ab Wheel", deload ? "2" : "3", "8")
        ]
      },
      {
        day: "Saturday",
        short: "Optional Recovery",
        type: "Recovery",
        focus: "Mobility, walking, and recovery.",
        exercises: [
          ex("Walk / Easy Bike", "1", "20-30 min"),
          ex("Mobility", "1", "10-15 min"),
          ex("Breathing", "1", "5 min")
        ]
      }
    ]
  };
}

function buildMonth5Week(week) {
  const i = week - 16;
  const deload = i === 4;
  const split = { low: 20, max: 20 };
  const snatch = { 1: "60%", 2: "65%", 3: "70%", 4: "55-60%" }[i];
  const speedSq = { 1: "50%", 2: "55%", 3: "60%", 4: "45-50%" }[i];
  const clean = { 1: "65%", 2: "67.5%", 3: "70%", 4: "60%" }[i];
  const front = { 1: "70%", 2: "72.5%", 3: "75%", 4: "65%" }[i];
  const back = { 1: "80%", 2: "82.5%", 3: "85%", 4: "70%" }[i];
  return {
    week,
    month: 5,
    title: "Month 5 • Speed Strength & Shock Loading",
    summary: deload ? "Deload week. Keep speed but slash volume and remove most shock loading." : "Shift toward speed-strength, shock work, and recovery-friendly general days.",
    jumpSplit: split,
    deload,
    days: [
      {
        day: "Monday",
        short: "Lift A",
        type: "Lift",
        focus: "High intent and max bar speed.",
        exercises: [
          ex("Power Snatch", deload ? "3" : "6", "2", snatch),
          ex("Speed Back Squat", deload ? "3" : "6", "2", speedSq, "Every rep should be violent."),
          ex("Trap Bar Jump", deload ? "2" : "4", "3", "light"),
          ex("Medball Overhead Throw", deload ? "2" : "4", "5"),
          ex("Step-Off Landing", deload ? "2" : "4", "3"),
          ex("Standing Calf Raise", deload ? "2" : "3", "12 fast")
        ]
      },
      jumpTemplate("Jump + Regeneration", split, [
        ex("Ankle Hops", "3", "20"),
        ex("Snap-Downs", "3", "5"),
        ex("Easy Approach Jumps", "4-6", "total"),
        ex("Easy Bounds", "3", "10 m"),
        ex("Max Approach Jumps", deload ? "4" : "6", "total"),
        ex("Max Standing Jumps", deload ? "3" : "4", "total"),
        ex("Dunk Attempts", deload ? "0-2" : "2-4", "optional"),
        ex("Mobility", "1", "20 min"),
        ex("Easy Core", "1", "10-15 min"),
        ex("Walk / Bike", "1", "15 min")
      ]),
      {
        day: "Wednesday",
        short: "Lift B",
        type: "Lift",
        focus: "Fast Olympic lifting with small doses of plyo shock work.",
        exercises: [
          ex("Power Clean", deload ? "3" : "6", "2", clean),
          ex("Front Squat", deload ? "3" : "4", "3", front, "Fast concentric."),
          ex("Hurdle Hops", deload ? "2" : "4", deload ? "3" : "4"),
          ex("Box Drop to Vertical Jump", deload ? "0-2" : "3", "3"),
          ex("Hip Thrust", deload ? "2" : "3", "5"),
          ex("Pallof Press", deload ? "2" : "3", "10/side")
        ]
      },
      jumpTemplate("Jump + Recovery", split, [
        ex("Low-Effort Jump Touches", deload ? "4" : "6", "total"),
        ex("Max Jump Attempts", deload ? "4" : "6", "total"),
        ex("Static Flexibility", "1", "15-20 min"),
        ex("Trunk Circuit", "3", "rounds", "", "Dead bug x10/side, side plank x30 sec, bird dog x10/side, reverse crunch x12."),
        ex("Easy Sled Drag", deload ? "0-2" : "4", "20 m")
      ]),
      {
        day: "Friday",
        short: "Lift C",
        type: "Lift",
        focus: "Blend of low-volume power and enough heavy work to keep strength.",
        exercises: [
          ex("Jump Squat", deload ? "3" : "5", "3", "light"),
          ex("Back Squat", deload ? "2" : "3", "3", back),
          ex("Broad Jump", deload ? "2" : "4", "2"),
          ex("Bounds", deload ? "0-2" : "3", "20 m"),
          ex("Seated Calf Raise", deload ? "2" : "3", "12"),
          ex("Ab Wheel", deload ? "2" : "3", "8")
        ]
      },
      {
        day: "Saturday",
        short: "Optional Recovery",
        type: "Recovery",
        focus: "Only do extra jumps if your legs feel springy.",
        exercises: [
          ex("Optional Max Jumps", deload ? "0-2" : (i === 3 ? "4-6" : "0-4"), "total"),
          ex("Mobility", "1", "10-15 min"),
          ex("Walk", "1", "15-20 min")
        ]
      }
    ]
  };
}

function buildMonth6Week(week) {
  const i = week - 20;
  const deload = i === 4;
  const split = { low: 20, max: 20 };
  const back = { 1: "55%", 2: "57.5-60%", 3: "60%", 4: "55-60%" }[i];
  const rdl = { 1: "55%", 2: "57.5-60%", 3: "60%", 4: "55%" }[i];
  const front = { 1: "50-55%", 2: "55-60%", 3: "55-60%", 4: "50-55%" }[i];
  return {
    week,
    month: 6,
    title: "Month 6 • Peak Specificity",
    summary: deload ? "Peak week. Low volume, high quality, and performance first." : "This phase is about showing the strength you built. Sprints and jumps are the priority.",
    jumpSplit: split,
    deload,
    days: [
      {
        day: "Monday",
        short: "Sprint + Jump + Lift",
        type: "Sprint / Jump",
        focus: "Acceleration work and max jumps first; lifts are only supportive.",
        exercises: [
          ex("Acceleration Sprints", i === 3 ? "4" : "6", "20 m"),
          ex("Sprints", i === 3 ? "4" : "4", i === 3 ? "30 m" : "30 m"),
          ex("Approach Jumps / Dunk Attempts", deload ? "6" : "8-10", "total"),
          ex("Back Squat", deload ? "2" : "3", deload ? "3" : (i === 3 ? "4-5" : "5"), back),
          ex("RDL", deload ? "2" : (i === 3 ? "2-3" : "3"), deload ? "4" : (i === 3 ? "5-6" : "6"), rdl),
          ex("Standing Calf Raise", deload ? "0-2" : "3", "10")
        ]
      },
      {
        day: "Tuesday",
        short: "Recovery Day",
        type: "Recovery",
        focus: "Reset the nervous system and keep tissues feeling good.",
        exercises: [
          ex("Walk / Bike", "1", "20-30 min"),
          ex("Ankle Mobility", "1", "5-10 min"),
          ex("Hip Mobility", "1", "5-10 min"),
          ex("Light Trunk Work", "1", "10 min"),
          ex("Easy Stretching", "1", "10 min")
        ]
      },
      {
        day: "Wednesday",
        short: "Plyo + Easy Lift",
        type: "Plyometric",
        focus: "Elastic contacts with low-fatigue support lifting.",
        exercises: [
          ex("Bounds", deload ? "0-3" : (i === 3 ? "3" : "4"), "20 m"),
          ex("Hurdle Hops", deload ? "0-3" : (i === 3 ? "3" : "4"), "3"),
          ex("Depth Jump / Box Drop to Jump", deload ? "0-3" : "3", "3"),
          ex("Front Squat", deload ? "2" : "3", deload ? "3" : (i === 3 ? "4-5" : "5"), front),
          ex("Hip Thrust", deload ? "1-2" : "2", deload ? "5" : "6 easy"),
          ex("Hamstring Curl", deload ? "0-2" : "2", "8"),
          ex("Core", deload ? "0-2" : "2-3", "sets")
        ]
      },
      {
        day: "Thursday",
        short: "Recovery Day",
        type: "Recovery",
        focus: "Keep blood flow and elasticity without adding fatigue.",
        exercises: [
          ex("Easy Tempo", deload ? "0-1" : "6", deload ? "Walk / bike" : "60 m @ 60%"),
          ex("Static Stretching", "1", "10-15 min"),
          ex("Breathing Work", "1", "5 min")
        ]
      },
      {
        day: "Friday",
        short: deload ? "Performance Day" : "Max Jump + Lift",
        type: deload ? "Performance" : "Jump / Lift",
        focus: deload ? "Full warm-up, then go after your best jump." : "Max jump quality first, then easy support lifting.",
        exercises: deload ? [
          ex("Full Warm-Up", "1", "15-20 min"),
          ex("Max Jump Attempts", "4-8", "total"),
          ex("Standing Vertical Test", "1", "best attempt"),
          ex("Approach Jump / Dunk Session", "1", "best attempts")
        ] : [
          ex("Approach Jumps / Dunk Attempts", i === 2 ? "8-10" : "10-12", "total"),
          ex("Standing Vertical Jumps", "4-6", "total"),
          ex("Broad Jumps", i === 2 ? "2-3" : "3", "2"),
          ex("Trap Bar Deadlift or Back Squat", i === 3 ? "2-3" : "3", i === 3 ? "4" : "4", back),
          ex("Single-Leg RDL", "2", i === 3 ? "5/leg" : "6/leg"),
          ex("Calf Raise", "2", "12")
        ]
      },
      {
        day: "Saturday",
        short: "Optional Touches",
        type: "Recovery",
        focus: "Only do this if you still feel springy.",
        exercises: [
          ex("Optional Rim Touches / Approach Jumps", deload ? "0-2" : "4-6", "total"),
          ex("Mobility", "1", "10-15 min")
        ]
      }
    ]
  };
}


const programData = Array.from({ length: 24 }, (_, index) => buildWeek(index + 1));


const STORAGE_KEYS_V3 = {
  activeWeek: "vj-active-week-v3",
  activeDay: "vj-active-day-v3",
  checks: "vj-checks-v3",
  sessionNotes: "vj-session-notes-v3",
  weeklyProgress: "vj-weekly-progress-v3",
  trainingMaxes: "vj-training-maxes-v3",
  uiState: "vj-ui-state-v3",
  calendar: "vj-calendar-v3",
  firebaseConfig: "vj-firebase-config-v1"
};

const DEFAULT_MAXES = {
  backSquat: "",
  frontSquat: "",
  powerClean: "",
  pushPress: "",
  powerSnatch: "",
  trapBarDeadlift: ""
};

const MAX_LABELS = {
  backSquat: "Back Squat",
  frontSquat: "Front Squat",
  powerClean: "Power Clean",
  pushPress: "Push Press",
  powerSnatch: "Power Snatch",
  trapBarDeadlift: "Trap Bar Deadlift"
};

const DEFAULT_CALENDAR = {
  programStartDate: "",
  autoFollowCurrentDay: true
};

const DEFAULT_FIREBASE_CONFIG = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  appId: "",
  storageBucket: "",
  messagingSenderId: "",
  autoCloudSync: false
};

const FIREBASE_URLS = {
  app: "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js",
  auth: "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js",
  firestore: "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js"
};

const els = {};
let toastTimeout = null;
let deferredPrompt = null;
let cloudSyncTimeout = null;
const firebaseCtx = {
  modules: null,
  app: null,
  auth: null,
  db: null,
  provider: null,
  unsubscribe: null,
  signature: ""
};

let appState = {
  activeView: "home",
  activeWeek: 1,
  activeDay: 0,
  browseWeek: 1,
  trackerWeek: 1,
  checks: {},
  sessionNotes: {},
  weeklyProgress: {},
  trainingMaxes: { ...DEFAULT_MAXES },
  calendar: { ...DEFAULT_CALENDAR },
  firebaseConfig: { ...DEFAULT_FIREBASE_CONFIG },
  currentContext: null,
  authUser: null,
  cloudMessage: "Local-only mode",
  cloudMessageTone: "subtle",
  timer: null
};

function $(id) {
  return document.getElementById(id);
}

function safeParse(raw, fallback) {
  try {
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : fallback;
  } catch {
    return fallback;
  }
}

function esc(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function formatInputDate(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function parseInputDate(value) {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const [y, m, d] = value.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function startOfDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function getDefaultStartDate() {
  const today = startOfDay(new Date());
  const offset = (today.getDay() + 6) % 7;
  today.setDate(today.getDate() - offset);
  return today;
}

function getFriendlyDate(date) {
  return new Intl.DateTimeFormat(undefined, { weekday: "long", month: "short", day: "numeric" }).format(date);
}

function getWeek(weekNumber) {
  return programData.find((week) => week.week === weekNumber) || programData[0];
}

function getDayData(weekNumber, dayIndex) {
  return getWeek(weekNumber).days[dayIndex];
}

function resolveJumpSplit(weekData, dayIndex) {
  const dayData = weekData.days[dayIndex];
  if (dayData.jumpSplit) return dayData.jumpSplit;
  return weekData.jumpSplit || { low: 20, max: 20 };
}

function isJumpFocused(dayData) {
  const haystack = `${dayData.short} ${dayData.type} ${dayData.focus}`.toLowerCase();
  return Boolean(dayData.jumpSplit) || haystack.includes("jump") || haystack.includes("plyo") || haystack.includes("sprint");
}

function sessionKey(week, dayIndex) {
  return `${week}-${dayIndex}`;
}

function checkKey(week, dayIndex, exerciseIndex) {
  return `${week}-${dayIndex}-${exerciseIndex}`;
}

function getDayCompletion(weekNumber, dayIndex) {
  const dayData = getDayData(weekNumber, dayIndex);
  const total = dayData.exercises.length || 0;
  const done = dayData.exercises.reduce((count, _, exerciseIndex) => count + (appState.checks[checkKey(weekNumber, dayIndex, exerciseIndex)] ? 1 : 0), 0);
  return { total, done, percent: total ? Math.round((done / total) * 100) : 0 };
}

function getWeekCompletion(weekNumber) {
  const week = getWeek(weekNumber);
  let total = 0;
  let done = 0;
  week.days.forEach((_, dayIndex) => {
    const progress = getDayCompletion(weekNumber, dayIndex);
    total += progress.total;
    done += progress.done;
  });
  return { total, done, percent: total ? Math.round((done / total) * 100) : 0 };
}

function getTotalCompletion() {
  let total = 0;
  let done = 0;
  programData.forEach((week) => {
    const progress = getWeekCompletion(week.week);
    total += progress.total;
    done += progress.done;
  });
  return { total, done, percent: total ? Math.round((done / total) * 100) : 0 };
}

function getWeekMetrics(weekNumber) {
  return {
    bodyweight: "",
    standingVertical: "",
    approachJump: "",
    sleep: "",
    legFeel: "",
    readiness: "",
    notes: "",
    ...(appState.weeklyProgress[weekNumber] || {})
  };
}

function getPRs() {
  const values = Object.values(appState.weeklyProgress || {});
  const standing = values.map((entry) => Number(entry.standingVertical)).filter((value) => !Number.isNaN(value) && value > 0);
  const approach = values.map((entry) => Number(entry.approachJump)).filter((value) => !Number.isNaN(value) && value > 0);
  return {
    standing: standing.length ? Math.max(...standing) : null,
    approach: approach.length ? Math.max(...approach) : null
  };
}

function formatValue(value, suffix = "") {
  if (value === null || value === undefined || value === "") return "—";
  return `${value}${suffix}`;
}

function parseIntensityRange(intensity) {
  if (!intensity) return null;
  const matches = [...String(intensity).matchAll(/(\d+(?:\.\d+)?)%/g)].map((m) => Number(m[1]));
  return matches.length ? matches : null;
}

function mapExerciseToTrainingMax(exerciseName) {
  const name = exerciseName.toLowerCase();
  if (name.includes("front squat")) return "frontSquat";
  if (name.includes("back squat") || name.includes("pause back squat") || name.includes("speed back squat")) return "backSquat";
  if (name.includes("clean") || name.includes("hang power clean") || name.includes("clean pull")) return "powerClean";
  if (name.includes("push press")) return "pushPress";
  if (name.includes("snatch") || name.includes("snatch pull")) return "powerSnatch";
  if (name.includes("trap bar deadlift")) return "trapBarDeadlift";
  return null;
}

function roundToIncrement(value, increment = 5) {
  if (!value) return 0;
  return Math.round(value / increment) * increment;
}

function getLoadRecommendation(exercise) {
  const tmKey = mapExerciseToTrainingMax(exercise.name);
  if (!tmKey) return "";
  const max = Number(appState.trainingMaxes[tmKey]);
  if (!max) return "";
  const range = parseIntensityRange(exercise.intensity);
  if (!range) return "";
  if (range.length === 1) {
    const load = roundToIncrement(max * (range[0] / 100));
    return `Recommended load: <strong>${load} lb</strong> based on ${MAX_LABELS[tmKey]} max.`;
  }
  const min = roundToIncrement(max * (Math.min(...range) / 100));
  const maxLoad = roundToIncrement(max * (Math.max(...range) / 100));
  return `Recommended load: <strong>${min}-${maxLoad} lb</strong> based on ${MAX_LABELS[tmKey]} max.`;
}

function countTrainingDaysBefore(startDate, targetDate) {
  const start = startOfDay(startDate);
  const target = startOfDay(targetDate);
  if (target <= start) return 0;
  let count = 0;
  const cursor = new Date(start);
  while (cursor < target) {
    if (cursor.getDay() !== 0) count += 1;
    cursor.setDate(cursor.getDate() + 1);
  }
  return count;
}

function getCalendarContext(referenceDate = new Date()) {
  const targetDate = startOfDay(referenceDate);
  const startDate = parseInputDate(appState.calendar.programStartDate) || getDefaultStartDate();
  let trainingIndex = countTrainingDaysBefore(startDate, targetDate);
  if (targetDate < startDate) trainingIndex = 0;
  const maxIndex = programData.length * DAYS.length - 1;
  trainingIndex = clamp(trainingIndex, 0, maxIndex);
  const week = Math.floor(trainingIndex / DAYS.length) + 1;
  const dayIndex = trainingIndex % DAYS.length;
  const isRestDay = targetDate.getDay() === 0;
  const isBeforeStart = targetDate < startDate;
  const isAfterProgram = countTrainingDaysBefore(startDate, targetDate) > maxIndex;
  return {
    actualDate: targetDate,
    startDate,
    week,
    dayIndex,
    isRestDay,
    isBeforeStart,
    isAfterProgram,
    label: `${getFriendlyDate(targetDate)} • ${isRestDay ? "Recovery day" : `Week ${week} ${DAYS[dayIndex]}`}`,
    nextTrainingLabel: `Week ${week} • ${DAYS[dayIndex]}`
  };
}

function updateCurrentContext() {
  appState.currentContext = getCalendarContext(new Date());
}

function getSelectedWeekAndDay() {
  return {
    week: getWeek(appState.activeWeek),
    day: getDayData(appState.activeWeek, appState.activeDay)
  };
}

function selectionMatchesCurrent() {
  if (!appState.currentContext) return false;
  return appState.activeWeek === appState.currentContext.week && appState.activeDay === appState.currentContext.dayIndex;
}

function setSelectionToCurrent(shouldRender = true, message = false) {
  updateCurrentContext();
  appState.activeWeek = appState.currentContext.week;
  appState.activeDay = appState.currentContext.dayIndex;
  appState.browseWeek = appState.activeWeek;
  appState.trackerWeek = appState.activeWeek;
  resetTimerState();
  persistState(false);
  syncGlobalSelectors();
  if (shouldRender) renderAll();
  if (message) showToast(appState.currentContext.isRestDay ? "It is a recovery day. Showing the next training session." : "Jumped to the current training day.");
}

function createTimerState(weekData, dayIndex) {
  const split = resolveJumpSplit(weekData, dayIndex);
  return {
    split,
    phases: [
      { label: "Low Effort", seconds: split.low * 60 },
      { label: "Max Effort", seconds: split.max * 60 }
    ],
    phaseIndex: 0,
    remaining: split.low * 60,
    running: false,
    intervalId: null
  };
}

function stopTimerInterval() {
  if (appState.timer && appState.timer.intervalId) {
    clearInterval(appState.timer.intervalId);
    appState.timer.intervalId = null;
  }
  if (appState.timer) appState.timer.running = false;
}

function resetTimerState() {
  stopTimerInterval();
  appState.timer = createTimerState(getWeek(appState.activeWeek), appState.activeDay);
}

function getFirebaseDocData() {
  return {
    activeWeek: appState.activeWeek,
    activeDay: appState.activeDay,
    checks: appState.checks,
    sessionNotes: appState.sessionNotes,
    weeklyProgress: appState.weeklyProgress,
    trainingMaxes: appState.trainingMaxes,
    calendar: appState.calendar
  };
}

function loadState() {
  appState.activeWeek = clamp(Number(localStorage.getItem(STORAGE_KEYS_V3.activeWeek)) || 1, 1, 24);
  appState.activeDay = clamp(Number(localStorage.getItem(STORAGE_KEYS_V3.activeDay)) || 0, 0, 5);
  appState.checks = safeParse(localStorage.getItem(STORAGE_KEYS_V3.checks) || "{}", {});
  appState.sessionNotes = safeParse(localStorage.getItem(STORAGE_KEYS_V3.sessionNotes) || "{}", {});
  appState.weeklyProgress = safeParse(localStorage.getItem(STORAGE_KEYS_V3.weeklyProgress) || "{}", {});
  appState.trainingMaxes = { ...DEFAULT_MAXES, ...safeParse(localStorage.getItem(STORAGE_KEYS_V3.trainingMaxes) || "{}", {}) };
  appState.calendar = { ...DEFAULT_CALENDAR, ...safeParse(localStorage.getItem(STORAGE_KEYS_V3.calendar) || "{}", {}) };
  appState.firebaseConfig = { ...DEFAULT_FIREBASE_CONFIG, ...safeParse(localStorage.getItem(STORAGE_KEYS_V3.firebaseConfig) || "{}", {}) };
  const ui = safeParse(localStorage.getItem(STORAGE_KEYS_V3.uiState) || "{}", {});
  if (ui.activeView) appState.activeView = ui.activeView;
  if (!appState.calendar.programStartDate) appState.calendar.programStartDate = formatInputDate(getDefaultStartDate());
  updateCurrentContext();
  if (appState.calendar.autoFollowCurrentDay || !localStorage.getItem(STORAGE_KEYS_V3.activeWeek)) {
    appState.activeWeek = appState.currentContext.week;
    appState.activeDay = appState.currentContext.dayIndex;
  }
  appState.browseWeek = appState.activeWeek;
  appState.trackerWeek = appState.activeWeek;
  appState.cloudMessage = hasFirebaseConfig(appState.firebaseConfig) ? "Cloud ready once you sign in" : "Local-only mode";
  appState.cloudMessageTone = hasFirebaseConfig(appState.firebaseConfig) ? "success" : "subtle";
  appState.timer = createTimerState(getWeek(appState.activeWeek), appState.activeDay);
}

function persistState(scheduleSync = true) {
  localStorage.setItem(STORAGE_KEYS_V3.activeWeek, String(appState.activeWeek));
  localStorage.setItem(STORAGE_KEYS_V3.activeDay, String(appState.activeDay));
  localStorage.setItem(STORAGE_KEYS_V3.checks, JSON.stringify(appState.checks));
  localStorage.setItem(STORAGE_KEYS_V3.sessionNotes, JSON.stringify(appState.sessionNotes));
  localStorage.setItem(STORAGE_KEYS_V3.weeklyProgress, JSON.stringify(appState.weeklyProgress));
  localStorage.setItem(STORAGE_KEYS_V3.trainingMaxes, JSON.stringify(appState.trainingMaxes));
  localStorage.setItem(STORAGE_KEYS_V3.uiState, JSON.stringify({ activeView: appState.activeView }));
  localStorage.setItem(STORAGE_KEYS_V3.calendar, JSON.stringify(appState.calendar));
  localStorage.setItem(STORAGE_KEYS_V3.firebaseConfig, JSON.stringify(appState.firebaseConfig));
  if (scheduleSync) scheduleCloudSync();
}

function progressBar(percent) {
  return `<div class="progress-track"><div class="progress-fill" style="width:${clamp(percent, 0, 100)}%"></div></div>`;
}

function showToast(message) {
  els.toast.textContent = message;
  els.toast.classList.add("show");
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => els.toast.classList.remove("show"), 2200);
}

function syncGlobalSelectors() {
  els.headerWeekSelect.value = String(appState.activeWeek);
  els.headerDaySelect.value = String(appState.activeDay);
}

function populateGlobalSelectors() {
  els.headerWeekSelect.innerHTML = programData.map((week) => `<option value="${week.week}">Week ${week.week}</option>`).join("");
  els.headerDaySelect.innerHTML = DAYS.map((day, idx) => `<option value="${idx}">${day}</option>`).join("");
  syncGlobalSelectors();
}

function updateHero() {
  const { week, day } = getSelectedWeekAndDay();
  const completion = getDayCompletion(week.week, appState.activeDay);
  const current = appState.currentContext;
  const viewingCurrent = selectionMatchesCurrent();
  if (viewingCurrent && current.isRestDay) {
    els.heroTitle.textContent = `${getFriendlyDate(current.actualDate)} • Recovery Day`;
    els.heroSubtitle.textContent = `Today is your scheduled off day. The app is pointing to ${current.nextTrainingLabel}. You can still browse any other day.`;
    return;
  }
  els.heroTitle.textContent = `${viewingCurrent ? 'Today' : 'Viewing'} • Week ${week.week} • ${day.day}`;
  let subtitle = `${week.title}. ${day.focus}`;
  if (viewingCurrent) {
    subtitle += ` ${completion.percent ? `You are ${completion.percent}% through this session.` : 'No work checked off yet.'}`;
  } else {
    subtitle += ` Calendar says ${current.nextTrainingLabel}${current.isRestDay ? ' after your Sunday recovery day' : ''}.`;
  }
  els.heroSubtitle.textContent = subtitle;
}

function switchView(view) {
  appState.activeView = view;
  document.querySelectorAll(".view").forEach((panel) => panel.classList.toggle("active", panel.id === `view-${view}`));
  document.querySelectorAll(".nav-btn").forEach((btn) => btn.classList.toggle("active", btn.dataset.view === view));
  persistState(false);
}

function renderHome() {
  const { week, day } = getSelectedWeekAndDay();
  const completion = getWeekCompletion(appState.activeWeek);
  const todayCompletion = getDayCompletion(appState.activeWeek, appState.activeDay);
  const monthMeta = monthDefinitions.find((def) => def.weeks.includes(appState.activeWeek));
  const prs = getPRs();
  const split = resolveJumpSplit(week, appState.activeDay);
  const current = appState.currentContext;
  const viewingCurrent = selectionMatchesCurrent();
  const preview = day.exercises.slice(0, 5).map((exercise) => `
    <div class="preview-item">
      <strong>${esc(exercise.name)}</strong>
      <div class="muted">${[exercise.sets ? `${exercise.sets} sets` : "", exercise.reps || "", exercise.intensity ? `@ ${exercise.intensity}` : ""].filter(Boolean).join(" • ") || "Open for details"}</div>
    </div>
  `).join("");

  els.home.innerHTML = `
    <div class="grid two-col">
      <article class="card">
        <div class="card-header">
          <div>
            <p class="eyebrow">Dashboard</p>
            <h3 class="card-title">Current block status</h3>
          </div>
          <span class="badge ${week.deload ? 'warn' : ''}">${week.deload ? 'Deload week' : `Month ${week.month}`}</span>
        </div>
        <div class="metric-grid">
          <div class="metric">
            <span class="metric-label">Viewing</span>
            <div class="metric-value">${esc(day.short)}</div>
            <div class="metric-sub">Week ${week.week} • ${esc(day.day)}</div>
          </div>
          <div class="metric">
            <span class="metric-label">Calendar</span>
            <div class="metric-value">${current.isRestDay ? 'Rest' : esc(DAYS[current.dayIndex])}</div>
            <div class="metric-sub">${getFriendlyDate(current.actualDate)}</div>
          </div>
          <div class="metric">
            <span class="metric-label">Week completion</span>
            <div class="metric-value">${completion.percent}%</div>
            <div class="metric-sub">${completion.done} of ${completion.total} checks</div>
          </div>
          <div class="metric">
            <span class="metric-label">Today completion</span>
            <div class="metric-value">${todayCompletion.percent}%</div>
            <div class="metric-sub">${todayCompletion.done} of ${todayCompletion.total}</div>
          </div>
        </div>
        <div style="margin-top:16px">${progressBar(completion.percent)}</div>
        <div class="progress-meta"><span>${esc(week.title)}</span><span>${monthMeta ? esc(monthMeta.theme) : ''}</span></div>
        <div class="btn-row" style="margin-top:16px">
          <button class="btn btn-primary" data-action="go-today">Open session</button>
          <button class="btn btn-secondary" data-action="go-current">${viewingCurrent ? 'On current day' : 'Go to current day'}</button>
        </div>
      </article>

      <article class="card">
        <div class="card-header">
          <div>
            <p class="eyebrow">Records</p>
            <h3 class="card-title">Performance snapshot</h3>
          </div>
          <span class="badge ${appState.cloudMessageTone}">${esc(appState.cloudMessage)}</span>
        </div>
        <div class="metric-grid">
          <div class="metric">
            <span class="metric-label">Best standing vertical</span>
            <div class="metric-value">${formatValue(prs.standing, ' in')}</div>
            <div class="metric-sub">Logged weekly</div>
          </div>
          <div class="metric">
            <span class="metric-label">Best approach jump</span>
            <div class="metric-value">${formatValue(prs.approach, ' in')}</div>
            <div class="metric-sub">Logged weekly</div>
          </div>
          <div class="metric">
            <span class="metric-label">Program start</span>
            <div class="metric-value">${esc(appState.calendar.programStartDate)}</div>
            <div class="metric-sub">Adjust in settings</div>
          </div>
          <div class="metric">
            <span class="metric-label">Jump split</span>
            <div class="metric-value">${split.low}/${split.max}</div>
            <div class="metric-sub">low/max minutes</div>
          </div>
        </div>
      </article>
    </div>

    <div class="grid two-col" style="margin-top:14px">
      <article class="card">
        <div class="card-header">
          <div>
            <p class="eyebrow">Calendar-aware</p>
            <h3 class="card-title">What the app thinks today is</h3>
          </div>
          <span class="badge subtle">${viewingCurrent ? 'Aligned' : 'Browsing another day'}</span>
        </div>
        <div class="chip-row">
          <span class="chip">${esc(current.label)}</span>
          <span class="chip">Next session ${esc(current.nextTrainingLabel)}</span>
          <span class="chip">${appState.calendar.autoFollowCurrentDay ? 'Auto-follow on' : 'Auto-follow off'}</span>
        </div>
        <div class="hr"></div>
        <div class="muted">The app uses your program start date plus the real calendar date to pick the current training day automatically. You can still browse any week or day with the controls at the top.</div>
      </article>

      <article class="card">
        <div class="card-header">
          <div>
            <p class="eyebrow">Preview</p>
            <h3 class="card-title">${esc(day.day)} workout</h3>
          </div>
          <span class="badge">${esc(day.type)}</span>
        </div>
        <div class="muted" style="margin-bottom:14px">${esc(day.focus)}</div>
        <div class="workout-preview">${preview}</div>
      </article>
    </div>
  `;

  els.home.querySelector('[data-action="go-today"]').addEventListener('click', () => switchView('today'));
  els.home.querySelector('[data-action="go-current"]').addEventListener('click', () => setSelectionToCurrent(true, true));
}

function renderProgram() {
  const week = getWeek(appState.browseWeek);
  const completion = getWeekCompletion(appState.browseWeek);
  const current = appState.currentContext;
  els.program.innerHTML = `
    <div class="grid">
      <article class="card">
        <div class="card-header">
          <div>
            <p class="eyebrow">Program browser</p>
            <h3 class="card-title">Week ${week.week}</h3>
          </div>
          <label class="field-inline" style="min-width:128px">
            <span>Browse week</span>
            <select id="browseWeekSelect">${programData.map((entry) => `<option value="${entry.week}" ${entry.week === appState.browseWeek ? 'selected' : ''}>Week ${entry.week}</option>`).join('')}</select>
          </label>
        </div>
        <div class="muted">${esc(week.summary)}</div>
        <div class="badge-row" style="margin:14px 0 10px">
          <span class="badge">${esc(week.title)}</span>
          <span class="badge">Jump split ${week.jumpSplit.low}/${week.jumpSplit.max}</span>
          <span class="badge ${week.deload ? 'warn' : 'success'}">${week.deload ? 'Deload' : 'Build week'}</span>
          <span class="badge subtle">Current calendar: ${current.nextTrainingLabel}</span>
        </div>
        ${progressBar(completion.percent)}
        <div class="progress-meta"><span>Week completion</span><span>${completion.done}/${completion.total}</span></div>
      </article>

      <div class="program-day-list">
        ${week.days.map((day, dayIndex) => {
          const progress = getDayCompletion(week.week, dayIndex);
          return `
            <article class="program-day">
              <div class="card-header">
                <div>
                  <h4 class="card-title">${esc(day.day)} — ${esc(day.short)}</h4>
                  <div class="muted">${esc(day.focus)}</div>
                </div>
                <div class="badge-row">
                  <span class="badge subtle">${esc(day.type)}</span>
                  <span class="badge">${progress.percent}%</span>
                </div>
              </div>
              ${progressBar(progress.percent)}
              <div class="exercise-list" style="margin-top:12px">
                ${day.exercises.slice(0, 4).map((exercise) => `
                  <div class="preview-item">
                    <strong>${esc(exercise.name)}</strong>
                    <div class="muted">${[exercise.sets ? `${exercise.sets} sets` : '', exercise.reps || '', exercise.intensity ? `@ ${exercise.intensity}` : ''].filter(Boolean).join(' • ')}</div>
                  </div>
                `).join('')}
                ${day.exercises.length > 4 ? `<div class="empty-state">+ ${day.exercises.length - 4} more items inside this session.</div>` : ''}
              </div>
              <div class="btn-row" style="margin-top:12px">
                <button class="btn btn-secondary mini-btn" data-open-day="${dayIndex}">Open day</button>
                <button class="btn btn-ghost mini-btn" data-set-current="${dayIndex}">Make viewing day</button>
              </div>
            </article>
          `;
        }).join('')}
      </div>
    </div>
  `;

  $('#browseWeekSelect').addEventListener('change', (e) => {
    appState.browseWeek = Number(e.target.value);
    renderProgram();
  });
  els.program.querySelectorAll('[data-open-day]').forEach((btn) => {
    btn.addEventListener('click', () => {
      appState.activeWeek = appState.browseWeek;
      appState.activeDay = Number(btn.dataset.openDay);
      resetTimerState();
      persistState(false);
      syncGlobalSelectors();
      renderAll();
      switchView('today');
    });
  });
  els.program.querySelectorAll('[data-set-current]').forEach((btn) => {
    btn.addEventListener('click', () => {
      appState.activeWeek = appState.browseWeek;
      appState.activeDay = Number(btn.dataset.setCurrent);
      resetTimerState();
      persistState(false);
      syncGlobalSelectors();
      renderAll();
      showToast('Viewing day updated.');
    });
  });
}

function renderExerciseList(weekNumber, dayIndex, exercises) {
  return exercises.map((exercise, exerciseIndex) => {
    const key = checkKey(weekNumber, dayIndex, exerciseIndex);
    const checked = Boolean(appState.checks[key]);
    const loadRecommendation = getLoadRecommendation(exercise);
    const meta = [exercise.sets ? `${exercise.sets} sets` : '', exercise.reps || '', exercise.intensity ? `@ ${exercise.intensity}` : ''].filter(Boolean).join(' • ');
    return `
      <label class="exercise-item ${checked ? 'completed' : ''}" data-check-wrapper="${key}">
        <input class="exercise-check" type="checkbox" data-check="${key}" ${checked ? 'checked' : ''} />
        <div>
          <div class="exercise-title-row">
            <p class="exercise-title">${esc(exercise.name)}</p>
            <span class="badge ${checked ? 'success' : 'subtle'}">${checked ? 'Done' : 'Pending'}</span>
          </div>
          ${meta ? `<p class="exercise-meta">${esc(meta)}</p>` : ''}
          ${loadRecommendation ? `<p class="exercise-load">${loadRecommendation}</p>` : ''}
          ${exercise.note ? `<p class="exercise-note">${esc(exercise.note)}</p>` : ''}
        </div>
      </label>
    `;
  }).join('');
}

function renderTimerMarkup() {
  return `
    <div class="timer-shell">
      <div class="timer-readout">
        <div class="timer-phase" id="timerPhaseLabel">Low Effort</div>
        <div class="timer-time" id="timerTimeLabel">00:00</div>
        <div class="timer-sub" id="timerSubLabel">Session ready</div>
      </div>
      <div class="timer-segments">
        <div>
          <div class="segment-label-row"><span>Low effort block</span><span id="timerLowMeta">0%</span></div>
          <div class="progress-track"><div class="progress-fill" id="timerLowFill" style="width:0%"></div></div>
        </div>
        <div>
          <div class="segment-label-row"><span>Max effort block</span><span id="timerMaxMeta">0%</span></div>
          <div class="progress-track"><div class="progress-fill" id="timerMaxFill" style="width:0%"></div></div>
        </div>
      </div>
      <div class="btn-row">
        <button class="btn btn-primary" id="timerToggleBtn">Start</button>
        <button class="btn btn-secondary" id="timerNextBtn">Next block</button>
        <button class="btn btn-ghost" id="timerResetBtn">Reset</button>
      </div>
    </div>
  `;
}

function renderTimerVisuals() {
  if (!$('#timerPhaseLabel')) return;
  const timer = appState.timer;
  const phase = timer.phases[timer.phaseIndex];
  const lowTotal = timer.phases[0].seconds;
  const maxTotal = timer.phases[1].seconds;
  const lowElapsed = timer.phaseIndex > 0 ? lowTotal : lowTotal - timer.remaining;
  const maxElapsed = timer.phaseIndex > 1 ? maxTotal : (timer.phaseIndex === 1 ? maxTotal - timer.remaining : 0);
  const lowPercent = lowTotal ? (lowElapsed / lowTotal) * 100 : 0;
  const maxPercent = maxTotal ? (maxElapsed / maxTotal) * 100 : 0;
  const totalRemaining = (timer.phaseIndex === 0 ? timer.remaining + maxTotal : timer.remaining);
  $('#timerPhaseLabel').textContent = phase.label;
  $('#timerTimeLabel').textContent = formatClock(timer.remaining);
  $('#timerSubLabel').textContent = `${formatClock(totalRemaining)} total remaining`;
  $('#timerLowFill').style.width = `${clamp(lowPercent, 0, 100)}%`;
  $('#timerMaxFill').style.width = `${clamp(maxPercent, 0, 100)}%`;
  $('#timerLowMeta').textContent = `${Math.round(clamp(lowPercent, 0, 100))}%`;
  $('#timerMaxMeta').textContent = `${Math.round(clamp(maxPercent, 0, 100))}%`;
  $('#timerToggleBtn').textContent = timer.running ? 'Pause' : 'Start';
}

function bindTimerEvents() {
  const toggle = $('#timerToggleBtn');
  const reset = $('#timerResetBtn');
  const next = $('#timerNextBtn');
  if (!toggle || !reset || !next) return;
  toggle.addEventListener('click', toggleTimer);
  reset.addEventListener('click', () => {
    resetTimerState();
    renderTimerVisuals();
  });
  next.addEventListener('click', () => advanceTimerPhase(false));
}

function toggleTimer() {
  if (appState.timer.running) {
    stopTimerInterval();
    renderTimerVisuals();
    return;
  }
  appState.timer.running = true;
  appState.timer.intervalId = setInterval(() => {
    appState.timer.remaining -= 1;
    if (appState.timer.remaining <= 0) {
      advanceTimerPhase(true);
      return;
    }
    renderTimerVisuals();
  }, 1000);
  renderTimerVisuals();
}

function advanceTimerPhase(fromTick = false) {
  stopTimerInterval();
  if (appState.timer.phaseIndex === appState.timer.phases.length - 1) {
    appState.timer.phaseIndex = 0;
    appState.timer.remaining = appState.timer.phases[0].seconds;
    renderTimerVisuals();
    showToast(fromTick ? 'Jump timer finished.' : 'Timer reset to the first block.');
    return;
  }
  appState.timer.phaseIndex += 1;
  appState.timer.remaining = appState.timer.phases[appState.timer.phaseIndex].seconds;
  renderTimerVisuals();
  showToast(`Moved to ${appState.timer.phases[appState.timer.phaseIndex].label}.`);
}

function formatClock(totalSeconds) {
  const safe = Math.max(0, totalSeconds);
  const min = String(Math.floor(safe / 60)).padStart(2, '0');
  const sec = String(safe % 60).padStart(2, '0');
  return `${min}:${sec}`;
}

function renderToday() {
  const { week, day } = getSelectedWeekAndDay();
  const note = appState.sessionNotes[sessionKey(appState.activeWeek, appState.activeDay)] || { note: '', readiness: 7 };
  const completion = getDayCompletion(appState.activeWeek, appState.activeDay);
  const split = resolveJumpSplit(week, appState.activeDay);
  const viewingCurrent = selectionMatchesCurrent();
  const restBanner = viewingCurrent && appState.currentContext.isRestDay
    ? `<div class="card slim rest-banner"><div class="badge warn">Sunday recovery day</div><div class="muted" style="margin-top:8px">Today is off. The workout below is the next training session in your cycle.</div></div>`
    : '';

  els.today.innerHTML = `
    ${restBanner}
    <div class="grid summary-grid" ${restBanner ? 'style="margin-top:14px"' : ''}>
      <article class="card">
        <div class="card-header">
          <div>
            <p class="eyebrow">Session</p>
            <h3 class="card-title">${esc(day.day)} — ${esc(day.short)}</h3>
          </div>
          <div class="badge-row">
            <span class="badge subtle">${esc(day.type)}</span>
            <span class="badge">Week ${week.week}</span>
          </div>
        </div>
        <div class="muted">${esc(day.focus)}</div>
        <div class="day-strip" style="margin-top:16px">
          ${week.days.map((entry, idx) => {
            const progress = getDayCompletion(week.week, idx);
            const isCurrentPill = week.week === appState.currentContext.week && idx === appState.currentContext.dayIndex;
            return `
              <button class="day-pill ${idx === appState.activeDay ? 'active' : ''}" data-day-pill="${idx}">
                <div class="day-pill-title">${esc(entry.day)}</div>
                <div class="day-pill-meta">${esc(entry.short)} • ${progress.percent}%${isCurrentPill ? ' • current' : ''}</div>
              </button>
            `;
          }).join('')}
        </div>
        <div class="hr"></div>
        ${progressBar(completion.percent)}
        <div class="progress-meta"><span>Session completion</span><span>${completion.done}/${completion.total}</span></div>
      </article>

      <article class="card">
        <div class="card-header">
          <div>
            <p class="eyebrow">Jump timer</p>
            <h3 class="card-title">${isJumpFocused(day) ? 'Ready to run' : 'Optional today'}</h3>
          </div>
          <span class="badge">${split.low}/${split.max}</span>
        </div>
        ${renderTimerMarkup()}
      </article>
    </div>

    <div class="grid two-col" style="margin-top:14px">
      <article class="card">
        <div class="card-header">
          <div>
            <p class="eyebrow">Checklist</p>
            <h3 class="card-title">Today’s work</h3>
          </div>
          <div class="btn-row">
            <button class="btn btn-ghost mini-btn" id="goCurrentDayBtn">Go current</button>
            <button class="btn btn-ghost mini-btn" id="markSessionReset">Clear session</button>
          </div>
        </div>
        <div class="exercise-list">${renderExerciseList(week.week, appState.activeDay, day.exercises)}</div>
      </article>

      <article class="card">
        <div class="card-header">
          <div>
            <p class="eyebrow">Readiness</p>
            <h3 class="card-title">Log how you feel</h3>
          </div>
          <span class="badge subtle">Local save${appState.authUser && appState.firebaseConfig.autoCloudSync ? ' + cloud' : ''}</span>
        </div>
        <div class="form-card">
          <label>
            <span>Readiness score</span>
            <div class="range-row">
              <input id="sessionReadiness" type="range" min="1" max="10" step="1" value="${esc(note.readiness || 7)}" />
              <div class="range-value"><span id="sessionReadinessValue">${esc(note.readiness || 7)}</span>/10</div>
            </div>
          </label>
        </div>
        <div class="form-card" style="margin-top:12px">
          <label>
            <span>Session notes</span>
            <textarea id="sessionNoteInput" placeholder="How did the session feel? What was springy, slow, or worth adjusting?">${esc(note.note || '')}</textarea>
          </label>
        </div>
        <div class="btn-row" style="margin-top:12px">
          <button class="btn btn-primary" id="saveSessionNote">Save session notes</button>
        </div>
      </article>
    </div>
  `;

  els.today.querySelectorAll('[data-day-pill]').forEach((btn) => {
    btn.addEventListener('click', () => {
      appState.activeDay = Number(btn.dataset.dayPill);
      resetTimerState();
      persistState(false);
      syncGlobalSelectors();
      renderAll();
    });
  });
  els.today.querySelectorAll('[data-check]').forEach((input) => {
    input.addEventListener('change', () => {
      appState.checks[input.dataset.check] = input.checked;
      persistState();
      renderAll();
    });
  });
  $('#markSessionReset').addEventListener('click', resetTodayChecks);
  $('#goCurrentDayBtn').addEventListener('click', () => setSelectionToCurrent(true, true));
  const readinessInput = $('#sessionReadiness');
  readinessInput.addEventListener('input', () => {
    $('#sessionReadinessValue').textContent = readinessInput.value;
  });
  $('#saveSessionNote').addEventListener('click', saveSessionNotes);
  bindTimerEvents();
  renderTimerVisuals();
}

function saveSessionNotes() {
  const key = sessionKey(appState.activeWeek, appState.activeDay);
  appState.sessionNotes[key] = {
    readiness: $('#sessionReadiness').value,
    note: $('#sessionNoteInput').value.trim()
  };
  persistState();
  showToast('Session notes saved.');
  renderHome();
}

function resetTodayChecks() {
  const dayData = getDayData(appState.activeWeek, appState.activeDay);
  dayData.exercises.forEach((_, idx) => delete appState.checks[checkKey(appState.activeWeek, appState.activeDay, idx)]);
  persistState();
  renderAll();
  showToast('Session reset.');
}

function renderTracker() {
  const metrics = getWeekMetrics(appState.trackerWeek);
  const weekCompletion = getWeekCompletion(appState.trackerWeek);
  const overall = getTotalCompletion();
  const prs = getPRs();

  els.tracker.innerHTML = `
    <div class="grid two-col">
      <article class="card">
        <div class="card-header">
          <div>
            <p class="eyebrow">Tracker</p>
            <h3 class="card-title">Weekly log</h3>
          </div>
          <label class="field-inline" style="min-width:128px">
            <span>Week</span>
            <select id="trackerWeekSelect">${programData.map((entry) => `<option value="${entry.week}" ${entry.week === appState.trackerWeek ? 'selected' : ''}>Week ${entry.week}</option>`).join('')}</select>
          </label>
        </div>
        <div class="form-grid two-col">
          <div class="form-card"><label><span>Bodyweight (lb)</span><input id="metricBodyweight" type="number" inputmode="decimal" value="${esc(metrics.bodyweight)}" /></label></div>
          <div class="form-card"><label><span>Standing vertical (in)</span><input id="metricStanding" type="number" inputmode="decimal" value="${esc(metrics.standingVertical)}" /></label></div>
          <div class="form-card"><label><span>Approach jump (in)</span><input id="metricApproach" type="number" inputmode="decimal" value="${esc(metrics.approachJump)}" /></label></div>
          <div class="form-card"><label><span>Sleep average (hrs)</span><input id="metricSleep" type="number" inputmode="decimal" value="${esc(metrics.sleep)}" /></label></div>
          <div class="form-card"><label><span>Leg feel (1-10)</span><input id="metricLegFeel" type="number" min="1" max="10" value="${esc(metrics.legFeel)}" /></label></div>
          <div class="form-card"><label><span>Readiness trend (1-10)</span><input id="metricReadiness" type="number" min="1" max="10" value="${esc(metrics.readiness)}" /></label></div>
        </div>
        <div class="form-card" style="margin-top:12px"><label><span>Weekly notes</span><textarea id="metricNotes">${esc(metrics.notes || '')}</textarea></label></div>
        <div class="btn-row" style="margin-top:12px">
          <button class="btn btn-primary" id="saveMetricsBtn">Save weekly log</button>
          <button class="btn btn-ghost" id="clearMetricsBtn">Clear week</button>
        </div>
      </article>

      <article class="card">
        <div class="card-header">
          <div>
            <p class="eyebrow">Summary</p>
            <h3 class="card-title">Performance view</h3>
          </div>
          <span class="badge ${appState.cloudMessageTone}">${esc(appState.cloudMessage)}</span>
        </div>
        <div class="metric-grid">
          <div class="metric"><span class="metric-label">Week completion</span><div class="metric-value">${weekCompletion.percent}%</div><div class="metric-sub">${weekCompletion.done}/${weekCompletion.total} checks</div></div>
          <div class="metric"><span class="metric-label">Program completion</span><div class="metric-value">${overall.percent}%</div><div class="metric-sub">${overall.done}/${overall.total} checks</div></div>
          <div class="metric"><span class="metric-label">PR standing vertical</span><div class="metric-value">${formatValue(prs.standing, ' in')}</div><div class="metric-sub">best logged week</div></div>
          <div class="metric"><span class="metric-label">PR approach jump</span><div class="metric-value">${formatValue(prs.approach, ' in')}</div><div class="metric-sub">best logged week</div></div>
        </div>
        <div class="hr"></div>
        <div class="chip-row">
          <span class="chip">Track jumps weekly</span>
          <span class="chip">Use readiness + sleep to judge fatigue</span>
          <span class="chip">Cloud sync is optional</span>
        </div>
      </article>
    </div>

    <article class="card" style="margin-top:14px">
      <div class="card-header">
        <div>
          <p class="eyebrow">History</p>
          <h3 class="card-title">Saved weeks</h3>
        </div>
      </div>
      <div class="history-list">${renderHistoryRows()}</div>
    </article>
  `;

  $('#trackerWeekSelect').addEventListener('change', (e) => {
    appState.trackerWeek = Number(e.target.value);
    renderTracker();
  });
  $('#saveMetricsBtn').addEventListener('click', saveWeeklyMetrics);
  $('#clearMetricsBtn').addEventListener('click', clearWeeklyMetrics);
}

function renderHistoryRows() {
  const rows = Object.entries(appState.weeklyProgress)
    .sort((a, b) => Number(a[0]) - Number(b[0]))
    .map(([week, entry]) => `
      <div class="history-item">
        <div class="exercise-title-row">
          <strong>Week ${week}</strong>
          <span class="badge subtle">${formatValue(entry.sleep, ' hrs')} sleep</span>
        </div>
        <div class="muted" style="margin-top:8px">Bodyweight ${formatValue(entry.bodyweight, ' lb')} • Standing ${formatValue(entry.standingVertical, ' in')} • Approach ${formatValue(entry.approachJump, ' in')} • Leg feel ${formatValue(entry.legFeel, '/10')}</div>
        ${entry.notes ? `<div class="muted" style="margin-top:8px">${esc(entry.notes)}</div>` : ''}
      </div>
    `);
  return rows.length ? rows.join('') : `<div class="empty-state">No weekly logs yet. Save your first tracker entry to build your PRs and history.</div>`;
}

function saveWeeklyMetrics() {
  appState.weeklyProgress[appState.trackerWeek] = {
    bodyweight: $('#metricBodyweight').value,
    standingVertical: $('#metricStanding').value,
    approachJump: $('#metricApproach').value,
    sleep: $('#metricSleep').value,
    legFeel: $('#metricLegFeel').value,
    readiness: $('#metricReadiness').value,
    notes: $('#metricNotes').value.trim()
  };
  persistState();
  renderTracker();
  renderHome();
  showToast('Weekly tracker saved.');
}

function clearWeeklyMetrics() {
  delete appState.weeklyProgress[appState.trackerWeek];
  persistState();
  renderTracker();
  renderHome();
  showToast('Week log cleared.');
}

function hasFirebaseConfig(config) {
  return Boolean(config.apiKey && config.authDomain && config.projectId && config.appId);
}

async function ensureFirebaseModules() {
  if (firebaseCtx.modules) return firebaseCtx.modules;
  const [appMod, authMod, firestoreMod] = await Promise.all([
    import(FIREBASE_URLS.app),
    import(FIREBASE_URLS.auth),
    import(FIREBASE_URLS.firestore)
  ]);
  firebaseCtx.modules = { appMod, authMod, firestoreMod };
  return firebaseCtx.modules;
}

async function ensureFirebaseReady() {
  if (!hasFirebaseConfig(appState.firebaseConfig)) {
    setCloudMessage('Add your Firebase web app config in Settings first.', 'warn');
    renderSettings();
    return false;
  }
  const signature = JSON.stringify({
    apiKey: appState.firebaseConfig.apiKey,
    authDomain: appState.firebaseConfig.authDomain,
    projectId: appState.firebaseConfig.projectId,
    appId: appState.firebaseConfig.appId,
    storageBucket: appState.firebaseConfig.storageBucket,
    messagingSenderId: appState.firebaseConfig.messagingSenderId
  });
  if (firebaseCtx.app && firebaseCtx.signature === signature) return true;
  try {
    const { appMod, authMod, firestoreMod } = await ensureFirebaseModules();
    if (firebaseCtx.unsubscribe) {
      firebaseCtx.unsubscribe();
      firebaseCtx.unsubscribe = null;
    }
    for (const existing of appMod.getApps()) {
      await appMod.deleteApp(existing).catch(() => {});
    }
    firebaseCtx.app = appMod.initializeApp({
      apiKey: appState.firebaseConfig.apiKey,
      authDomain: appState.firebaseConfig.authDomain,
      projectId: appState.firebaseConfig.projectId,
      appId: appState.firebaseConfig.appId,
      storageBucket: appState.firebaseConfig.storageBucket || undefined,
      messagingSenderId: appState.firebaseConfig.messagingSenderId || undefined
    }, 'vertical-jump-pro');
    firebaseCtx.auth = authMod.getAuth(firebaseCtx.app);
    firebaseCtx.db = firestoreMod.getFirestore(firebaseCtx.app);
    firebaseCtx.provider = new authMod.GoogleAuthProvider();
    firebaseCtx.provider.setCustomParameters({ prompt: 'select_account' });
    firebaseCtx.signature = signature;
    firebaseCtx.unsubscribe = authMod.onAuthStateChanged(firebaseCtx.auth, (user) => {
      appState.authUser = user || null;
      setCloudMessage(user ? `Signed in as ${user.email || user.displayName || 'user'}` : 'Firebase ready. Sign in to sync.', user ? 'success' : 'subtle');
      renderSettings();
      renderHome();
      renderTracker();
    });
    await authMod.getRedirectResult(firebaseCtx.auth).catch(() => null);
    setCloudMessage(appState.authUser ? `Signed in as ${appState.authUser.email || appState.authUser.displayName || 'user'}` : 'Firebase ready. Sign in to sync.', appState.authUser ? 'success' : 'subtle');
    return true;
  } catch (error) {
    console.error(error);
    setCloudMessage('Firebase setup failed. Check your config and hosting URL.', 'warn');
    return false;
  }
}

function setCloudMessage(message, tone = 'subtle') {
  appState.cloudMessage = message;
  appState.cloudMessageTone = tone;
}

async function signInWithGoogle() {
  const ready = await ensureFirebaseReady();
  if (!ready) {
    showToast('Cloud sign-in is not ready yet.');
    return;
  }
  try {
    const { authMod } = firebaseCtx.modules;
    const isIOS = /iPad|iPhone|iPod/i.test(navigator.userAgent);
    if (isIOS) {
      await authMod.signInWithRedirect(firebaseCtx.auth, firebaseCtx.provider);
      return;
    }
    await authMod.signInWithPopup(firebaseCtx.auth, firebaseCtx.provider);
    showToast('Signed in with Google.');
  } catch (error) {
    console.error(error);
    showToast('Google sign-in did not complete.');
  }
}

async function signOutCloud() {
  if (!firebaseCtx.auth) return;
  try {
    const { authMod } = firebaseCtx.modules;
    await authMod.signOut(firebaseCtx.auth);
    showToast('Signed out of cloud sync.');
  } catch (error) {
    console.error(error);
    showToast('Could not sign out.');
  }
}

async function saveCloudData(silent = false) {
  const ready = await ensureFirebaseReady();
  if (!ready || !appState.authUser || !firebaseCtx.db) {
    if (!silent) showToast('Sign in first to save to the cloud.');
    return;
  }
  try {
    const { firestoreMod } = firebaseCtx.modules;
    const ref = firestoreMod.doc(firebaseCtx.db, 'users', appState.authUser.uid, 'apps', 'vertical-jump-pro');
    await firestoreMod.setDoc(ref, { ...getFirebaseDocData(), updatedAt: firestoreMod.serverTimestamp() }, { merge: true });
    setCloudMessage(`Cloud saved for ${appState.authUser.email || 'your account'}`, 'success');
    renderSettings();
    renderHome();
    renderTracker();
    if (!silent) showToast('Saved to cloud.');
  } catch (error) {
    console.error(error);
    setCloudMessage('Cloud save failed.', 'warn');
    renderSettings();
    if (!silent) showToast('Cloud save failed.');
  }
}

async function loadCloudData() {
  const ready = await ensureFirebaseReady();
  if (!ready || !appState.authUser || !firebaseCtx.db) {
    showToast('Sign in first to load cloud data.');
    return;
  }
  try {
    const { firestoreMod } = firebaseCtx.modules;
    const ref = firestoreMod.doc(firebaseCtx.db, 'users', appState.authUser.uid, 'apps', 'vertical-jump-pro');
    const snap = await firestoreMod.getDoc(ref);
    if (!snap.exists()) {
      showToast('No cloud save found yet.');
      return;
    }
    const data = snap.data();
    appState.activeWeek = clamp(Number(data.activeWeek) || appState.activeWeek, 1, 24);
    appState.activeDay = clamp(Number(data.activeDay) || appState.activeDay, 0, 5);
    appState.checks = data.checks || {};
    appState.sessionNotes = data.sessionNotes || {};
    appState.weeklyProgress = data.weeklyProgress || {};
    appState.trainingMaxes = { ...DEFAULT_MAXES, ...(data.trainingMaxes || {}) };
    appState.calendar = { ...DEFAULT_CALENDAR, ...(data.calendar || appState.calendar) };
    updateCurrentContext();
    if (appState.calendar.autoFollowCurrentDay) {
      appState.activeWeek = appState.currentContext.week;
      appState.activeDay = appState.currentContext.dayIndex;
    }
    appState.browseWeek = appState.activeWeek;
    appState.trackerWeek = appState.activeWeek;
    resetTimerState();
    persistState(false);
    syncGlobalSelectors();
    renderAll();
    setCloudMessage(`Cloud loaded for ${appState.authUser.email || 'your account'}`, 'success');
    showToast('Loaded cloud save.');
  } catch (error) {
    console.error(error);
    showToast('Could not load cloud data.');
  }
}

function scheduleCloudSync() {
  if (!appState.firebaseConfig.autoCloudSync || !appState.authUser || !hasFirebaseConfig(appState.firebaseConfig)) return;
  clearTimeout(cloudSyncTimeout);
  cloudSyncTimeout = setTimeout(() => saveCloudData(true), 1200);
}

function renderSettings() {
  const canUseCloud = hasFirebaseConfig(appState.firebaseConfig);
  els.settings.innerHTML = `
    <div class="grid settings-grid">
      <article class="card">
        <div class="card-header">
          <div>
            <p class="eyebrow">Training maxes</p>
            <h3 class="card-title">Auto-calc your lifts</h3>
          </div>
          <span class="badge subtle">Pounds</span>
        </div>
        <div class="form-grid two-col">
          ${Object.entries(MAX_LABELS).map(([key, label]) => `
            <div class="form-card">
              <label>
                <span>${label}</span>
                <input type="number" inputmode="decimal" data-max-input="${key}" value="${esc(appState.trainingMaxes[key] || '')}" placeholder="Enter max" />
              </label>
            </div>
          `).join('')}
        </div>
        <div class="btn-row" style="margin-top:12px">
          <button class="btn btn-primary" id="saveMaxesBtn">Save maxes</button>
        </div>
        <div class="muted" style="margin-top:12px">Any exercise with a percentage and a matching lift family will show a recommended load in the Today view.</div>
      </article>

      <article class="card">
        <div class="card-header">
          <div>
            <p class="eyebrow">Calendar</p>
            <h3 class="card-title">Automatic current day</h3>
          </div>
          <span class="badge ${appState.calendar.autoFollowCurrentDay ? 'success' : 'subtle'}">${appState.calendar.autoFollowCurrentDay ? 'Auto-follow on' : 'Manual browse'}</span>
        </div>
        <div class="form-grid two-col">
          <div class="form-card">
            <label>
              <span>Program start date</span>
              <input id="programStartDate" type="date" value="${esc(appState.calendar.programStartDate)}" />
            </label>
          </div>
          <div class="form-card">
            <label>
              <span>Follow the real date automatically</span>
              <select id="autoFollowCurrentDay">
                <option value="true" ${appState.calendar.autoFollowCurrentDay ? 'selected' : ''}>Yes</option>
                <option value="false" ${!appState.calendar.autoFollowCurrentDay ? 'selected' : ''}>No</option>
              </select>
            </label>
          </div>
        </div>
        <div class="muted" style="margin-top:12px">Current calendar mapping: ${esc(appState.currentContext.label)}. On Sunday, the app treats the day as recovery and points you to the next training day.</div>
        <div class="btn-row" style="margin-top:12px">
          <button class="btn btn-primary" id="saveCalendarBtn">Save calendar settings</button>
          <button class="btn btn-ghost" id="goCurrentSettingsBtn">Go to current day</button>
        </div>
      </article>
    </div>

    <div class="grid two-col" style="margin-top:14px">
      <article class="card">
        <div class="card-header">
          <div>
            <p class="eyebrow">Cloud sync</p>
            <h3 class="card-title">Google sign-in + Firebase</h3>
          </div>
          <span class="badge ${appState.cloudMessageTone}">${esc(appState.cloudMessage)}</span>
        </div>
        <div class="muted">Add your Firebase web app config, enable Google sign-in in Firebase Auth, then save or load your app data with the same Google account.</div>
        <div class="form-grid two-col" style="margin-top:12px">
          ${[
            ['apiKey', 'API key'],
            ['authDomain', 'Auth domain'],
            ['projectId', 'Project ID'],
            ['appId', 'App ID'],
            ['storageBucket', 'Storage bucket'],
            ['messagingSenderId', 'Messaging sender ID']
          ].map(([key, label]) => `
            <div class="form-card">
              <label>
                <span>${label}</span>
                <input type="text" data-fb-input="${key}" value="${esc(appState.firebaseConfig[key] || '')}" placeholder="${label}" />
              </label>
            </div>
          `).join('')}
        </div>
        <div class="form-card" style="margin-top:12px">
          <label>
            <span>Auto-sync after local saves</span>
            <select id="autoCloudSync">
              <option value="false" ${!appState.firebaseConfig.autoCloudSync ? 'selected' : ''}>Off</option>
              <option value="true" ${appState.firebaseConfig.autoCloudSync ? 'selected' : ''}>On</option>
            </select>
          </label>
        </div>
        <div class="btn-row" style="margin-top:12px">
          <button class="btn btn-primary" id="saveFirebaseConfigBtn">Save cloud config</button>
          <button class="btn btn-secondary" id="googleSignInBtn">${appState.authUser ? 'Connected' : 'Sign in with Google'}</button>
          <button class="btn btn-ghost" id="signOutCloudBtn">Sign out</button>
        </div>
        <div class="btn-row" style="margin-top:12px">
          <button class="btn btn-secondary" id="saveToCloudBtn" ${!canUseCloud ? 'disabled' : ''}>Save to cloud</button>
          <button class="btn btn-ghost" id="loadFromCloudBtn" ${!canUseCloud ? 'disabled' : ''}>Load from cloud</button>
        </div>
      </article>

      <article class="card">
        <div class="card-header">
          <div>
            <p class="eyebrow">Data + install</p>
            <h3 class="card-title">Backup and restore</h3>
          </div>
          <span class="badge subtle">JSON + PWA</span>
        </div>
        <div class="btn-row">
          <button class="btn btn-secondary" id="exportDataBtn">Export data</button>
          <button class="btn btn-ghost" id="importDataBtn">Import data</button>
          <button class="btn btn-danger" id="resetAllDataBtn">Reset everything</button>
        </div>
        <div class="hr"></div>
        <div class="muted">Export creates a local JSON backup with your checks, notes, tracker logs, maxes, calendar settings, and current week/day. Import restores that backup on this device.</div>
        <div class="btn-row" style="margin-top:12px">
          <button class="btn btn-primary ${deferredPrompt ? '' : 'hidden'}" id="settingsInstallBtn">Install app</button>
        </div>
      </article>
    </div>
  `;

  els.settings.querySelectorAll('[data-max-input]').forEach((input) => {
    input.addEventListener('keydown', (event) => { if (event.key === 'Enter') saveTrainingMaxes(); });
  });
  $('#saveMaxesBtn').addEventListener('click', saveTrainingMaxes);
  $('#saveCalendarBtn').addEventListener('click', saveCalendarSettings);
  $('#goCurrentSettingsBtn').addEventListener('click', () => setSelectionToCurrent(true, true));
  $('#saveFirebaseConfigBtn').addEventListener('click', saveFirebaseConfig);
  $('#googleSignInBtn').addEventListener('click', signInWithGoogle);
  $('#signOutCloudBtn').addEventListener('click', signOutCloud);
  $('#saveToCloudBtn').addEventListener('click', () => saveCloudData(false));
  $('#loadFromCloudBtn').addEventListener('click', loadCloudData);
  $('#exportDataBtn').addEventListener('click', exportData);
  $('#importDataBtn').addEventListener('click', () => els.importFileInput.click());
  $('#resetAllDataBtn').addEventListener('click', resetAllData);
  const installSettingsBtn = $('#settingsInstallBtn');
  if (installSettingsBtn) installSettingsBtn.addEventListener('click', handleInstall);
}

function saveTrainingMaxes() {
  Object.keys(MAX_LABELS).forEach((key) => {
    const input = document.querySelector(`[data-max-input="${key}"]`);
    if (input) appState.trainingMaxes[key] = input.value;
  });
  persistState();
  renderToday();
  showToast('Training maxes saved.');
}

function saveCalendarSettings() {
  appState.calendar.programStartDate = $('#programStartDate').value || formatInputDate(getDefaultStartDate());
  appState.calendar.autoFollowCurrentDay = $('#autoFollowCurrentDay').value === 'true';
  updateCurrentContext();
  if (appState.calendar.autoFollowCurrentDay) {
    appState.activeWeek = appState.currentContext.week;
    appState.activeDay = appState.currentContext.dayIndex;
    appState.browseWeek = appState.activeWeek;
    appState.trackerWeek = appState.activeWeek;
    resetTimerState();
  }
  persistState();
  syncGlobalSelectors();
  renderAll();
  showToast('Calendar settings saved.');
}

function saveFirebaseConfig() {
  document.querySelectorAll('[data-fb-input]').forEach((input) => {
    appState.firebaseConfig[input.dataset.fbInput] = input.value.trim();
  });
  appState.firebaseConfig.autoCloudSync = $('#autoCloudSync').value === 'true';
  persistState(false);
  if (hasFirebaseConfig(appState.firebaseConfig)) {
    setCloudMessage('Cloud config saved. Sign in with Google to sync.', 'success');
    ensureFirebaseReady().then(() => renderSettings()).catch(() => renderSettings());
  } else {
    setCloudMessage('Cloud config saved locally. Add required fields to use Google sync.', 'warn');
    renderSettings();
  }
  showToast('Cloud settings saved.');
}

function exportData() {
  const payload = {
    exportedAt: new Date().toISOString(),
    data: {
      ...getFirebaseDocData(),
      firebaseConfig: appState.firebaseConfig
    }
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'vertical-jump-pro-backup.json';
  link.click();
  URL.revokeObjectURL(url);
  showToast('Backup exported.');
}

function importDataFromFile(file) {
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const parsed = JSON.parse(reader.result);
      const data = parsed.data || parsed;
      appState.activeWeek = clamp(Number(data.activeWeek) || 1, 1, 24);
      appState.activeDay = clamp(Number(data.activeDay) || 0, 0, 5);
      appState.checks = data.checks || {};
      appState.sessionNotes = data.sessionNotes || {};
      appState.weeklyProgress = data.weeklyProgress || {};
      appState.trainingMaxes = { ...DEFAULT_MAXES, ...(data.trainingMaxes || {}) };
      appState.calendar = { ...DEFAULT_CALENDAR, ...(data.calendar || {}) };
      if (data.firebaseConfig) appState.firebaseConfig = { ...DEFAULT_FIREBASE_CONFIG, ...data.firebaseConfig };
      updateCurrentContext();
      appState.browseWeek = appState.activeWeek;
      appState.trackerWeek = appState.activeWeek;
      resetTimerState();
      persistState(false);
      syncGlobalSelectors();
      renderAll();
      showToast('Backup imported.');
    } catch {
      showToast('Import failed. Use a valid JSON backup.');
    }
  };
  reader.readAsText(file);
}

function resetAllData() {
  const confirmed = window.confirm('Reset all saved checks, notes, maxes, calendar settings, and tracker data on this device?');
  if (!confirmed) return;
  Object.values(STORAGE_KEYS_V3).forEach((key) => localStorage.removeItem(key));
  stopTimerInterval();
  loadState();
  syncGlobalSelectors();
  renderAll();
  showToast('All local data reset.');
}

function bindGlobalEvents() {
  els.headerWeekSelect.addEventListener('change', (e) => {
    appState.activeWeek = Number(e.target.value);
    resetTimerState();
    persistState(false);
    renderAll();
  });
  els.headerDaySelect.addEventListener('change', (e) => {
    appState.activeDay = Number(e.target.value);
    resetTimerState();
    persistState(false);
    renderAll();
  });
  els.resetTodayBtn.textContent = 'Go Current';
  els.resetTodayBtn.addEventListener('click', () => setSelectionToCurrent(true, true));
  els.installBtn.addEventListener('click', handleInstall);
  document.querySelectorAll('.nav-btn').forEach((btn) => {
    btn.addEventListener('click', () => switchView(btn.dataset.view));
  });
  els.importFileInput.addEventListener('change', (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) importDataFromFile(file);
    e.target.value = '';
  });
}

async function handleInstall() {
  if (!deferredPrompt) {
    showToast('Install prompt not available here. Use Add to Home Screen in your browser.');
    return;
  }
  deferredPrompt.prompt();
  await deferredPrompt.userChoice;
  deferredPrompt = null;
  els.installBtn.classList.add('hidden');
  renderSettings();
}

function renderAll() {
  updateCurrentContext();
  updateHero();
  renderHome();
  renderProgram();
  renderToday();
  renderTracker();
  renderSettings();
  switchView(appState.activeView);
}

function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js').catch(() => {});
    });
  }
}

function initFirebaseSilently() {
  if (!hasFirebaseConfig(appState.firebaseConfig)) return;
  ensureFirebaseReady().then(() => {
    renderSettings();
    renderHome();
    renderTracker();
  }).catch(() => {});
}

function init() {
  els.home = $('view-home');
  els.program = $('view-program');
  els.today = $('view-today');
  els.tracker = $('view-tracker');
  els.settings = $('view-settings');
  els.heroTitle = $('heroTitle');
  els.heroSubtitle = $('heroSubtitle');
  els.headerWeekSelect = $('headerWeekSelect');
  els.headerDaySelect = $('headerDaySelect');
  els.installBtn = $('installBtn');
  els.resetTodayBtn = $('resetTodayBtn');
  els.toast = $('toast');
  els.importFileInput = $('importFileInput');

  loadState();
  populateGlobalSelectors();
  bindGlobalEvents();
  renderAll();
  registerServiceWorker();
  initFirebaseSilently();

  window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    deferredPrompt = event;
    els.installBtn.classList.remove('hidden');
    renderSettings();
  });

  window.addEventListener('appinstalled', () => {
    deferredPrompt = null;
    els.installBtn.classList.add('hidden');
    renderSettings();
  });
}

document.addEventListener('DOMContentLoaded', init);




/* ===== Patch: robust Today / Tracker / Settings + safe rendering ===== */
function renderErrorCard(title, message) {
  return `
    <article class="card">
      <div class="card-header">
        <div>
          <p class="eyebrow">Render fallback</p>
          <h3 class="card-title">${esc(title)}</h3>
        </div>
        <span class="badge warn">Recovered</span>
      </div>
      <div class="muted">${esc(message)}</div>
    </article>
  `;
}

function safeRenderPanel(panel, renderer, label) {
  if (!panel) return;
  try {
    renderer();
  } catch (error) {
    console.error(`Render failed for ${label}:`, error);
    panel.innerHTML = renderErrorCard(`${label} failed to load`, "The app recovered instead of leaving the tab blank. Try switching tabs again.");
  }
}

function switchView(view) {
  appState.activeView = view;
  const renderers = {
    home: () => safeRenderPanel(els.home, renderHome, 'Home'),
    program: () => safeRenderPanel(els.program, renderProgram, 'Program'),
    today: () => safeRenderPanel(els.today, renderToday, 'Today'),
    tracker: () => safeRenderPanel(els.tracker, renderTracker, 'Tracker'),
    settings: () => safeRenderPanel(els.settings, renderSettings, 'Settings')
  };
  if (renderers[view]) renderers[view]();
  document.querySelectorAll(".view").forEach((panel) => panel.classList.toggle("active", panel.id === `view-${view}`));
  document.querySelectorAll(".nav-btn").forEach((btn) => btn.classList.toggle("active", btn.dataset.view === view));
  persistState(false);
}

function renderToday() {
  const selected = getSelectedWeekAndDay();
  const week = selected.week;
  const day = selected.day;
  const split = resolveJumpSplit(week, appState.activeDay);
  const completion = getDayCompletion(appState.activeWeek, appState.activeDay);
  const session = appState.sessionNotes[sessionKey(appState.activeWeek, appState.activeDay)] || { readiness: 7, note: "" };
  const viewingCurrent = selectionMatchesCurrent();
  const current = appState.currentContext;
  const restBanner = viewingCurrent && current && current.isRestDay
    ? `<article class="card slim rest-banner"><div class="badge warn">Sunday recovery day</div><div class="muted" style="margin-top:8px">The app points you to your next training session after your Sunday off day, but you can still browse any week or day you want.</div></article>`
    : "";

  els.today.innerHTML = `
    ${restBanner}
    <div class="grid two-col" ${restBanner ? 'style="margin-top:14px"' : ''}>
      <article class="card">
        <div class="card-header">
          <div>
            <p class="eyebrow">Today</p>
            <h3 class="card-title">Week ${week.week} • ${esc(day.day)} • ${esc(day.short)}</h3>
          </div>
          <div class="badge-row">
            <span class="badge subtle">${esc(day.type)}</span>
            <span class="badge">${completion.percent}% complete</span>
          </div>
        </div>
        <div class="muted">${esc(day.focus || week.summary || '')}</div>
        <div class="chip-row" style="margin-top:14px">
          <span class="chip">${viewingCurrent ? esc(current.label) : `Browsing Week ${week.week}`}</span>
          <span class="chip">Jump split ${split.low}/${split.max}</span>
          ${week.deload ? '<span class="chip">Deload week</span>' : ''}
        </div>
        <div class="day-strip" style="margin-top:16px">
          ${week.days.map((entry, idx) => {
            const dayProgress = getDayCompletion(week.week, idx);
            const isCalendarDay = current && week.week === current.week && idx === current.dayIndex;
            return `
              <button class="day-pill ${idx === appState.activeDay ? 'active' : ''}" data-today-day="${idx}">
                <div class="day-pill-title">${esc(entry.day)}</div>
                <div class="day-pill-meta">${esc(entry.short)} • ${dayProgress.percent}%${isCalendarDay ? ' • current' : ''}</div>
              </button>
            `;
          }).join('')}
        </div>
        <div class="hr"></div>
        ${progressBar(completion.percent)}
        <div class="progress-meta"><span>Session completion</span><span>${completion.done}/${completion.total} checks</span></div>
        <div class="btn-row" style="margin-top:14px">
          <button class="btn btn-ghost" id="todayGoCurrentBtn">Go to current day</button>
          <button class="btn btn-ghost" id="todayResetChecksBtn">Clear session checks</button>
        </div>
      </article>

      <article class="card">
        <div class="card-header">
          <div>
            <p class="eyebrow">Jump timer</p>
            <h3 class="card-title">${isJumpFocused(day) ? 'Session timer ready' : 'Optional timer today'}</h3>
          </div>
          <span class="badge">${split.low}m + ${split.max}m</span>
        </div>
        <div class="muted" style="margin-bottom:14px">Use this for your low-effort block and your max-effort block. It follows the month’s programmed split automatically.</div>
        ${renderTimerMarkup()}
      </article>
    </div>

    <div class="grid two-col" style="margin-top:14px">
      <article class="card">
        <div class="card-header">
          <div>
            <p class="eyebrow">Checklist</p>
            <h3 class="card-title">Work for this session</h3>
          </div>
          <span class="badge subtle">${day.exercises.length} items</span>
        </div>
        <div class="exercise-list">${renderExerciseList(week.week, appState.activeDay, day.exercises)}</div>
      </article>

      <article class="card">
        <div class="card-header">
          <div>
            <p class="eyebrow">Readiness</p>
            <h3 class="card-title">Log how it felt</h3>
          </div>
          <span class="badge subtle">${appState.authUser && appState.firebaseConfig.autoCloudSync ? 'Local + cloud' : 'Local save'}</span>
        </div>
        <div class="form-grid two-col">
          <div class="form-card">
            <label>
              <span>Readiness score</span>
              <div class="range-row">
                <input id="sessionReadiness" type="range" min="1" max="10" value="${esc(session.readiness || 7)}" />
                <div class="range-value"><span id="sessionReadinessValue">${esc(session.readiness || 7)}</span>/10</div>
              </div>
            </label>
          </div>
          <div class="metric compact">
            <span class="metric-label">Calendar status</span>
            <div class="metric-value">${viewingCurrent && current && current.isRestDay ? 'Recovery' : esc(day.day)}</div>
            <div class="metric-sub">${viewingCurrent ? 'Auto-detected from real date' : 'Manual browse mode'}</div>
          </div>
        </div>
        <div class="form-card" style="margin-top:12px">
          <label>
            <span>Session notes</span>
            <textarea id="sessionNoteInput" placeholder="Springy, flat, knees good, bar speed good, dunk attempts, anything worth keeping track of.">${esc(session.note || '')}</textarea>
          </label>
        </div>
        <div class="btn-row" style="margin-top:12px">
          <button class="btn btn-primary" id="saveSessionNote">Save session notes</button>
        </div>
      </article>
    </div>
  `;

  els.today.querySelectorAll('[data-today-day]').forEach((btn) => {
    btn.addEventListener('click', () => {
      appState.activeDay = Number(btn.dataset.todayDay);
      resetTimerState();
      persistState(false);
      syncGlobalSelectors();
      renderAll();
    });
  });
  els.today.querySelectorAll('[data-check]').forEach((input) => {
    input.addEventListener('change', () => {
      appState.checks[input.dataset.check] = input.checked;
      persistState();
      renderAll();
    });
  });

  const goCurrent = $('#todayGoCurrentBtn');
  if (goCurrent) goCurrent.addEventListener('click', () => setSelectionToCurrent(true, true));
  const resetChecks = $('#todayResetChecksBtn');
  if (resetChecks) resetChecks.addEventListener('click', resetTodayChecks);

  const readinessInput = $('#sessionReadiness');
  if (readinessInput) {
    readinessInput.addEventListener('input', () => {
      const valueEl = $('#sessionReadinessValue');
      if (valueEl) valueEl.textContent = readinessInput.value;
    });
  }
  const saveNotesBtn = $('#saveSessionNote');
  if (saveNotesBtn) saveNotesBtn.addEventListener('click', saveSessionNotes);

  bindTimerEvents();
  renderTimerVisuals();
}

function renderTracker() {
  const metrics = getWeekMetrics(appState.trackerWeek);
  const prs = getPRs();
  const weekCompletion = getWeekCompletion(appState.trackerWeek);
  const totalCompletion = getTotalCompletion();

  els.tracker.innerHTML = `
    <div class="grid two-col">
      <article class="card">
        <div class="card-header">
          <div>
            <p class="eyebrow">Tracker</p>
            <h3 class="card-title">Weekly performance log</h3>
          </div>
          <label class="field-inline" style="min-width:132px">
            <span>Week</span>
            <select id="trackerWeekSelect">
              ${programData.map((entry) => `<option value="${entry.week}" ${entry.week === appState.trackerWeek ? 'selected' : ''}>Week ${entry.week}</option>`).join('')}
            </select>
          </label>
        </div>
        <div class="muted">Save bodyweight, jump numbers, sleep, leg feel, readiness, and notes for each week so the app can track your PRs and trends.</div>
        <div class="form-grid two-col" style="margin-top:14px">
          <div class="form-card"><label><span>Bodyweight (lb)</span><input id="metricBodyweight" type="number" inputmode="decimal" value="${esc(metrics.bodyweight || '')}" /></label></div>
          <div class="form-card"><label><span>Standing vertical (in)</span><input id="metricStanding" type="number" inputmode="decimal" value="${esc(metrics.standingVertical || '')}" /></label></div>
          <div class="form-card"><label><span>Approach jump (in)</span><input id="metricApproach" type="number" inputmode="decimal" value="${esc(metrics.approachJump || '')}" /></label></div>
          <div class="form-card"><label><span>Sleep average (hrs)</span><input id="metricSleep" type="number" inputmode="decimal" value="${esc(metrics.sleep || '')}" /></label></div>
          <div class="form-card"><label><span>Leg feel (1-10)</span><input id="metricLegFeel" type="number" min="1" max="10" value="${esc(metrics.legFeel || '')}" /></label></div>
          <div class="form-card"><label><span>Readiness trend (1-10)</span><input id="metricReadiness" type="number" min="1" max="10" value="${esc(metrics.readiness || '')}" /></label></div>
        </div>
        <div class="form-card" style="margin-top:12px">
          <label><span>Weekly notes</span><textarea id="metricNotes">${esc(metrics.notes || '')}</textarea></label>
        </div>
        <div class="btn-row" style="margin-top:12px">
          <button class="btn btn-primary" id="saveMetricsBtn">Save weekly log</button>
          <button class="btn btn-ghost" id="clearMetricsBtn">Clear week</button>
        </div>
      </article>

      <article class="card">
        <div class="card-header">
          <div>
            <p class="eyebrow">Overview</p>
            <h3 class="card-title">Performance summary</h3>
          </div>
          <span class="badge ${appState.cloudMessageTone || 'subtle'}">${esc(appState.cloudMessage || 'Local-only mode')}</span>
        </div>
        <div class="metric-grid">
          <div class="metric">
            <span class="metric-label">Week completion</span>
            <div class="metric-value">${weekCompletion.percent}%</div>
            <div class="metric-sub">${weekCompletion.done}/${weekCompletion.total} items done</div>
          </div>
          <div class="metric">
            <span class="metric-label">Program completion</span>
            <div class="metric-value">${totalCompletion.percent}%</div>
            <div class="metric-sub">${totalCompletion.done}/${totalCompletion.total} total items</div>
          </div>
          <div class="metric">
            <span class="metric-label">PR standing vertical</span>
            <div class="metric-value">${formatValue(prs.standing, ' in')}</div>
            <div class="metric-sub">best saved week</div>
          </div>
          <div class="metric">
            <span class="metric-label">PR approach jump</span>
            <div class="metric-value">${formatValue(prs.approach, ' in')}</div>
            <div class="metric-sub">best saved week</div>
          </div>
        </div>
        <div class="hr"></div>
        <div class="chip-row">
          <span class="chip">Use weekly numbers, not daily noise</span>
          <span class="chip">Sleep + leg feel help explain flat days</span>
          <span class="chip">Cloud sync stays optional</span>
        </div>
      </article>
    </div>

    <article class="card" style="margin-top:14px">
      <div class="card-header">
        <div>
          <p class="eyebrow">History</p>
          <h3 class="card-title">Saved week logs</h3>
        </div>
      </div>
      <div class="history-list">${renderHistoryRows()}</div>
    </article>
  `;

  const trackerWeekSelect = $('#trackerWeekSelect');
  if (trackerWeekSelect) trackerWeekSelect.addEventListener('change', (e) => {
    appState.trackerWeek = Number(e.target.value);
    persistState(false);
    renderTracker();
  });

  const saveBtn = $('#saveMetricsBtn');
  if (saveBtn) saveBtn.addEventListener('click', saveWeeklyMetrics);
  const clearBtn = $('#clearMetricsBtn');
  if (clearBtn) clearBtn.addEventListener('click', clearWeeklyMetrics);
}

function renderSettings() {
  const current = appState.currentContext || getCalendarContext(new Date());
  const canUseCloud = hasFirebaseConfig(appState.firebaseConfig);

  els.settings.innerHTML = `
    <div class="grid two-col">
      <article class="card">
        <div class="card-header">
          <div>
            <p class="eyebrow">Training maxes</p>
            <h3 class="card-title">Automatic load calculations</h3>
          </div>
          <span class="badge subtle">Pounds</span>
        </div>
        <div class="muted">Put in your maxes and the app will suggest working weights anywhere the program uses percentages.</div>
        <div class="form-grid two-col" style="margin-top:14px">
          ${Object.entries(MAX_LABELS).map(([key, label]) => `
            <div class="form-card">
              <label>
                <span>${label}</span>
                <input type="number" inputmode="decimal" data-max-input="${key}" value="${esc(appState.trainingMaxes[key] || '')}" placeholder="Enter max" />
              </label>
            </div>
          `).join('')}
        </div>
        <div class="btn-row" style="margin-top:12px">
          <button class="btn btn-primary" id="saveMaxesBtn">Save maxes</button>
        </div>
      </article>

      <article class="card">
        <div class="card-header">
          <div>
            <p class="eyebrow">Calendar</p>
            <h3 class="card-title">Real-date mapping</h3>
          </div>
          <span class="badge ${appState.calendar.autoFollowCurrentDay ? 'success' : 'subtle'}">${appState.calendar.autoFollowCurrentDay ? 'Auto-follow on' : 'Manual browse'}</span>
        </div>
        <div class="muted">The app already knows today’s date. Set your program start date once, and it will map the calendar to the right training week and day.</div>
        <div class="form-grid two-col" style="margin-top:14px">
          <div class="form-card">
            <label>
              <span>Program start date</span>
              <input id="programStartDate" type="date" value="${esc(appState.calendar.programStartDate || '')}" />
            </label>
          </div>
          <div class="form-card">
            <label>
              <span>Follow real date automatically</span>
              <select id="autoFollowCurrentDay">
                <option value="true" ${appState.calendar.autoFollowCurrentDay ? 'selected' : ''}>Yes</option>
                <option value="false" ${!appState.calendar.autoFollowCurrentDay ? 'selected' : ''}>No</option>
              </select>
            </label>
          </div>
        </div>
        <div class="chip-row" style="margin-top:14px">
          <span class="chip">${esc(current.label)}</span>
          <span class="chip">Current pointer: ${esc(current.nextTrainingLabel)}</span>
        </div>
        <div class="btn-row" style="margin-top:12px">
          <button class="btn btn-primary" id="saveCalendarBtn">Save calendar settings</button>
          <button class="btn btn-ghost" id="goCurrentSettingsBtn">Go to current day</button>
        </div>
      </article>
    </div>

    <div class="grid two-col" style="margin-top:14px">
      <article class="card">
        <div class="card-header">
          <div>
            <p class="eyebrow">Google sign-in + sync</p>
            <h3 class="card-title">Optional cloud save</h3>
          </div>
          <span class="badge ${appState.cloudMessageTone || 'subtle'}">${esc(appState.cloudMessage || 'Local-only mode')}</span>
        </div>
        <div class="muted">This stays optional. Local saving already works. If you want Google sign-in and cloud sync, add your Firebase web app config below and enable Google sign-in in Firebase.</div>
        <div class="form-grid two-col" style="margin-top:14px">
          ${[
            ['apiKey', 'API key'],
            ['authDomain', 'Auth domain'],
            ['projectId', 'Project ID'],
            ['appId', 'App ID'],
            ['storageBucket', 'Storage bucket'],
            ['messagingSenderId', 'Messaging sender ID']
          ].map(([key, label]) => `
            <div class="form-card">
              <label>
                <span>${label}</span>
                <input type="text" data-fb-input="${key}" value="${esc(appState.firebaseConfig[key] || '')}" placeholder="${label}" />
              </label>
            </div>
          `).join('')}
        </div>
        <div class="form-card" style="margin-top:12px">
          <label>
            <span>Auto-sync after local saves</span>
            <select id="autoCloudSync">
              <option value="false" ${!appState.firebaseConfig.autoCloudSync ? 'selected' : ''}>Off</option>
              <option value="true" ${appState.firebaseConfig.autoCloudSync ? 'selected' : ''}>On</option>
            </select>
          </label>
        </div>
        <div class="btn-row" style="margin-top:12px">
          <button class="btn btn-primary" id="saveFirebaseConfigBtn">Save cloud config</button>
          <button class="btn btn-secondary" id="googleSignInBtn">${appState.authUser ? 'Connected' : 'Sign in with Google'}</button>
          <button class="btn btn-ghost" id="signOutCloudBtn">Sign out</button>
        </div>
        <div class="btn-row" style="margin-top:12px">
          <button class="btn btn-secondary" id="saveToCloudBtn" ${!canUseCloud ? 'disabled' : ''}>Save to cloud</button>
          <button class="btn btn-ghost" id="loadFromCloudBtn" ${!canUseCloud ? 'disabled' : ''}>Load from cloud</button>
        </div>
      </article>

      <article class="card">
        <div class="card-header">
          <div>
            <p class="eyebrow">Backups + install</p>
            <h3 class="card-title">Keep your data safe</h3>
          </div>
          <span class="badge subtle">JSON + PWA</span>
        </div>
        <div class="muted">You can export everything as a JSON backup, import it later, or install the app to your home screen.</div>
        <div class="btn-row" style="margin-top:14px">
          <button class="btn btn-secondary" id="exportDataBtn">Export data</button>
          <button class="btn btn-ghost" id="importDataBtn">Import data</button>
          <button class="btn btn-danger" id="resetAllDataBtn">Reset everything</button>
        </div>
        <div class="hr"></div>
        <div class="chip-row">
          <span class="chip">Checks</span>
          <span class="chip">Notes</span>
          <span class="chip">Tracker logs</span>
          <span class="chip">Maxes</span>
          <span class="chip">Calendar settings</span>
        </div>
        <div class="btn-row" style="margin-top:14px">
          <button class="btn btn-primary ${deferredPrompt ? '' : 'hidden'}" id="settingsInstallBtn">Install app</button>
        </div>
      </article>
    </div>
  `;

  els.settings.querySelectorAll('[data-max-input]').forEach((input) => {
    input.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') saveTrainingMaxes();
    });
  });

  const bindIf = (id, eventName, handler) => {
    const el = $(id);
    if (el) el.addEventListener(eventName, handler);
  };

  bindIf('saveMaxesBtn', 'click', saveTrainingMaxes);
  bindIf('saveCalendarBtn', 'click', saveCalendarSettings);
  bindIf('goCurrentSettingsBtn', 'click', () => setSelectionToCurrent(true, true));
  bindIf('saveFirebaseConfigBtn', 'click', saveFirebaseConfig);
  bindIf('googleSignInBtn', 'click', signInWithGoogle);
  bindIf('signOutCloudBtn', 'click', signOutCloud);
  bindIf('saveToCloudBtn', 'click', () => saveCloudData(false));
  bindIf('loadFromCloudBtn', 'click', loadCloudData);
  bindIf('exportDataBtn', 'click', exportData);
  bindIf('importDataBtn', 'click', () => els.importFileInput.click());
  bindIf('resetAllDataBtn', 'click', resetAllData);
  bindIf('settingsInstallBtn', 'click', handleInstall);
}

function renderAll() {
  updateCurrentContext();
  updateHero();
  safeRenderPanel(els.home, renderHome, 'Home');
  safeRenderPanel(els.program, renderProgram, 'Program');
  safeRenderPanel(els.today, renderToday, 'Today');
  safeRenderPanel(els.tracker, renderTracker, 'Tracker');
  safeRenderPanel(els.settings, renderSettings, 'Settings');
  switchView(appState.activeView);
}
/* ===== End patch ===== */


/* ===== Exercise details modal + responsive render overrides ===== */
const EXERCISE_DETAIL_LIBRARY = [
  {
    match: ['hang power clean', 'power clean'],
    title: 'Power Clean',
    category: 'Olympic lift',
    description: 'Explosive pull into a quick catch. It trains triple extension, timing, and the kind of force production that carries over to jumping.',
    why: 'Used to build fast force production and teach you to express power without grinding.',
    cues: ['Stay tall through the start.', 'Push the floor away, then snap fast.', 'Catch with quick elbows and a solid brace.'],
    avoid: ['Yanking with the arms first.', 'Jumping forward.', 'Catching soft with the chest collapsed.']
  },
  {
    match: ['clean pull', 'high pull', 'jump shrug', 'snatch pull'],
    title: 'Explosive Pull',
    category: 'Power pull',
    description: 'A fast pull that overloads extension and bar speed without the catch. Great for building force and clean mechanics.',
    why: 'Lets you move heavy loads explosively while focusing on violent extension and posture.',
    cues: ['Keep the bar close.', 'Finish tall through the hips, knees, and ankles.', 'Stay patient, then explode.'],
    avoid: ['Looping the bar away from the body.', 'Cutting extension short.', 'Shrugging early.']
  },
  {
    match: ['power snatch'],
    title: 'Power Snatch',
    category: 'Olympic lift',
    description: 'A lighter, very fast Olympic variation that emphasizes speed-strength, coordination, and crisp overhead receiving.',
    why: 'This shows up later in the cycle to keep bar speed extremely high without accumulating too much fatigue.',
    cues: ['Stay smooth off the floor or hang.', 'Keep the bar close and fast.', 'Punch the arms through aggressively.'],
    avoid: ['Swinging the bar out.', 'Rushing the second pull.', 'Catching with unstable shoulders.']
  },
  {
    match: ['pause back squat', 'speed back squat', 'jump squat', 'back squat'],
    title: 'Back Squat',
    category: 'Strength lift',
    description: 'A lower-body strength staple. Variations like pause, speed, and jump squats change the focus from absolute strength to bar speed or position control.',
    why: 'Builds the leg and hip force base that supports higher jump output.',
    cues: ['Brace before every rep.', 'Keep the whole foot planted.', 'Drive up hard without losing position.'],
    avoid: ['Knees collapsing inward.', 'Heels popping up.', 'Turning every set into a grind.']
  },
  {
    match: ['front squat'],
    title: 'Front Squat',
    category: 'Strength lift',
    description: 'A more upright squat variation that loads the quads and trunk heavily while reinforcing clean receiving positions.',
    why: 'Helps build force with a little less total fatigue than heavy back squat work for some athletes.',
    cues: ['Elbows high.', 'Stay tall through the torso.', 'Sit straight down and drive up fast.'],
    avoid: ['Elbows dropping.', 'Dumping forward out of the hole.', 'Relaxing the brace.']
  },
  {
    match: ['rdl', 'good morning', 'deadlift'],
    title: 'Posterior Chain Hinge',
    category: 'Hinge pattern',
    description: 'Hip-dominant strength work for the hamstrings, glutes, and trunk. Variations change the tempo or single-leg demand.',
    why: 'Builds the hamstring and hip strength you need for takeoff power, landing control, and injury resilience.',
    cues: ['Push the hips back.', 'Keep the ribs down and spine long.', 'Feel the hamstrings load, then finish through the hips.'],
    avoid: ['Turning it into a squat.', 'Rounding the back.', 'Letting the bar drift away.']
  },
  {
    match: ['hip thrust'],
    title: 'Hip Thrust',
    category: 'Glute strength',
    description: 'A glute-focused bridge pattern that lets you train hip extension hard with limited lower-back fatigue.',
    why: 'Useful for building hip extension strength and keeping the posterior chain strong without too much total system fatigue.',
    cues: ['Tuck the ribs slightly.', 'Drive through the mid-foot and heel.', 'Finish with glutes, not a huge back arch.'],
    avoid: ['Overextending the low back.', 'Losing tension at the top.', 'Rushing the eccentric.']
  },
  {
    match: ['split squat', 'rfess', 'walking lunge', 'reverse lunge', 'step-up'],
    title: 'Single-Leg Strength',
    category: 'Unilateral strength',
    description: 'Single-leg strength work to build balance, force application, and side-to-side symmetry.',
    why: 'Improves unilateral control for jumping, deceleration, and landing, especially when fatigue starts to expose weak links.',
    cues: ['Control the descent.', 'Keep the front foot rooted.', 'Drive straight up with a stable torso.'],
    avoid: ['Wobbling all over the place.', 'Pushing mostly off the back leg.', 'Losing pelvic control.']
  },
  {
    match: ['nordic', 'hamstring curl'],
    title: 'Hamstring Flexion',
    category: 'Hamstring accessory',
    description: 'Direct hamstring work, often with an eccentric emphasis, to make the posterior chain more resilient and powerful.',
    why: 'Helps protect the hamstrings and improve the eccentric qualities that matter for sprinting and jumping.',
    cues: ['Keep the hips extended.', 'Lower under control.', 'Use just enough assistance to keep quality high.'],
    avoid: ['Breaking at the hips.', 'Crashing through the eccentric.', 'Using momentum.']
  },
  {
    match: ['calf raise'],
    title: 'Calf Raise',
    category: 'Lower-leg strength',
    description: 'Direct lower-leg work for ankle stiffness, elastic response, and general durability.',
    why: 'The lower leg matters a lot for bounce, stiffness, and clean ground contacts.',
    cues: ['Move through full range.', 'Own the top position.', 'Lower with control.'],
    avoid: ['Cutting range short.', 'Bouncing sloppily between reps.', 'Letting the feet roll in or out.']
  },
  {
    match: ['pogo', 'line hops', 'hurdle hops', 'snap-down', 'box jump', 'broad jump', 'bounds', 'depth jump', 'depth landing', 'box drop'],
    title: 'Plyometric / Jump Drill',
    category: 'Elastic work',
    description: 'A jump or landing drill used to improve stiffness, rhythm, contact quality, and jump-specific power.',
    why: 'These drills bridge strength work to actual jump performance and teach your body to use force quickly.',
    cues: ['Be crisp off the ground.', 'Own the landing.', 'Stop the set when jump quality drops.'],
    avoid: ['Turning everything into conditioning.', 'Soft, noisy, uncontrolled contacts.', 'Too much volume when you are already flat.']
  },
  {
    match: ['tempo', 'sprint', 'bike', 'walk'],
    title: 'Running / Recovery Work',
    category: 'Conditioning',
    description: 'Tempo runs, acceleration work, and recovery aerobic work support body composition, work capacity, and freshness across the cycle.',
    why: 'These pieces keep you athletic and conditioned without stealing too much from your explosive work when used correctly.',
    cues: ['Match the programmed intensity.', 'Keep mechanics clean.', 'Recover enough between hard reps.'],
    avoid: ['Running tempo like a sprint session.', 'Adding junk volume.', 'Letting mechanics fall apart.']
  },
  {
    match: ['sled drag', 'farmer carry'],
    title: 'General Athletic Work',
    category: 'GPP',
    description: 'Simple loaded movement that builds general strength, work capacity, and tissue robustness.',
    why: 'These movements help you stay athletic, resilient, and prepared for the more explosive work.',
    cues: ['Stay tall and stable.', 'Keep tension through the trunk.', 'Move with intent, not slop.'],
    avoid: ['Leaning and twisting all over the place.', 'Overloading it until mechanics get ugly.', 'Treating recovery work like max effort work.']
  },
  {
    match: ['medball', 'med ball', 'chest pass', 'overhead throw', 'slam', 'scoop toss'],
    title: 'Medicine Ball Throw',
    category: 'Power accessory',
    description: 'A ballistic throw that lets you express speed and intent without much eccentric cost.',
    why: 'Great for powerful extension and rotational intent while keeping fatigue manageable.',
    cues: ['Attack the throw.', 'Use the whole body.', 'Reset between reps so each throw stays explosive.'],
    avoid: ['Turning throws into cardio.', 'Using arms only.', 'Rushing the setup.']
  },
  {
    match: ['push press', 'bench', 'row', 'pull-up', 'pulldown', 'push-up', 'lateral raise', 'curl', 'pressdown'],
    title: 'Upper-Body Support Work',
    category: 'Upper body',
    description: 'Upper-body work keeps your shoulders, trunk, and posture strong while balancing all the lower-body emphasis in the jump program.',
    why: 'Better posture and upper-body strength help the full system stay athletic and durable across a long macrocycle.',
    cues: ['Move cleanly.', 'Keep positions honest.', 'Treat assistance work like practice, not ego lifting.'],
    avoid: ['Grinding every accessory set.', 'Using sloppy body English.', 'Adding too much fatigue for no reason.']
  },
  {
    match: ['plank', 'pallof', 'ab wheel', 'dead bug', 'bird dog', 'reverse crunch', 'copenhagen', 'hanging knee raise', 'leg raise'],
    title: 'Core Stability Work',
    category: 'Core',
    description: 'Core work to improve trunk stiffness, force transfer, and position control under fatigue.',
    why: 'A stable trunk helps you express force better and keeps sprinting, landing, and lifting positions cleaner.',
    cues: ['Brace like the rep matters.', 'Control the motion.', 'Keep hips and ribs stacked.'],
    avoid: ['Mindless reps.', 'Only chasing burn.', 'Losing the posture the drill is supposed to train.']
  },
  {
    match: ['mobility', 'stretch', 'foam', 'breathing'],
    title: 'Recovery / Mobility',
    category: 'Recovery',
    description: 'Recovery work is there to help you feel better, restore positions, and keep quality high in the training that matters most.',
    why: 'This keeps fatigue under control so the power work stays sharp.',
    cues: ['Breathe and slow down.', 'Work the positions you actually need.', 'Finish feeling better than when you started.'],
    avoid: ['Turning recovery work into another hard session.', 'Rushing through it.', 'Ignoring the areas that keep tightening up.']
  }
];

function getExerciseDetails(name) {
  const lower = String(name || '').toLowerCase();
  const found = EXERCISE_DETAIL_LIBRARY.find((entry) => entry.match.some((token) => lower.includes(token)));
  return found || {
    title: name || 'Exercise',
    category: 'Training piece',
    description: 'This movement supports the current phase of the jump program. Use the programmed sets, reps, and intensity while keeping quality high.',
    why: 'It is included to support the exact adaptation this week is chasing.',
    cues: ['Use clean technique.', 'Match the programmed intent.', 'Stop the set when quality falls off.'],
    avoid: ['Grinding low-value reps.', 'Adding random fatigue.', 'Ignoring the reason the movement is in the plan.']
  };
}

function getExerciseArt(name, category) {
  const title = String(name || 'Exercise');
  const cat = String(category || 'Training').toUpperCase();
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" fill="none">
    <defs>
      <linearGradient id="g" x1="120" y1="560" x2="1040" y2="120" gradientUnits="userSpaceOnUse">
        <stop stop-color="#155dff"/>
        <stop offset="1" stop-color="#58c2ff"/>
      </linearGradient>
    </defs>
    <rect width="1200" height="675" rx="42" fill="#0b111a"/>
    <circle cx="1020" cy="140" r="170" fill="url(#g)" opacity=".14"/>
    <circle cx="150" cy="560" r="180" fill="#1b4cff" opacity=".10"/>
    <rect x="76" y="84" width="1048" height="507" rx="34" fill="#111a28" stroke="#203148"/>
    <path d="M265 448l158-160 104 102 239-233" stroke="url(#g)" stroke-width="22" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="758" cy="160" r="28" fill="#8de1ff"/>
    <text x="96" y="150" fill="#7fb9ff" font-family="Arial, Helvetica, sans-serif" font-size="26" letter-spacing="4">${cat}</text>
    <text x="96" y="220" fill="#f4f8ff" font-family="Arial, Helvetica, sans-serif" font-size="58" font-weight="700">${escSvg(title)}</text>
    <text x="96" y="286" fill="#a7b6c7" font-family="Arial, Helvetica, sans-serif" font-size="28">Tap back into the workout and keep the movement crisp.</text>
    <rect x="96" y="478" width="260" height="64" rx="32" fill="#14243b" stroke="#28579f"/>
    <text x="130" y="520" fill="#cfe4ff" font-family="Arial, Helvetica, sans-serif" font-size="28">Vertical Jump Pro</text>
  </svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function escSvg(value) {
  return String(value || '').replace(/[&<>"']/g, (ch) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
}

function renderExerciseTrigger(exercise) {
  const meta = [exercise.sets ? `${exercise.sets} sets` : '', exercise.reps || '', exercise.intensity ? `@ ${exercise.intensity}` : ''].filter(Boolean).join(' • ');
  const note = exercise.note || '';
  return `<button class="preview-item-button" type="button" data-open-exercise="1" data-ex-name="${esc(exercise.name)}" data-ex-meta="${esc(meta)}" data-ex-note="${esc(note)}">
    <strong>${esc(exercise.name)}</strong>
    <div class="muted">${esc(meta || 'Open for details')}</div>
    <small>View movement details</small>
  </button>`;
}

function openExerciseModal(payload) {
  const modal = document.getElementById('exerciseModal');
  if (!modal) return;
  const details = getExerciseDetails(payload.name);
  const metaParts = [payload.meta, details.category].filter(Boolean).join(' • ');
  const noteText = payload.note || 'No extra note is attached to this movement in the current session.';
  const setText = (id, value) => {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  };
  setText('exerciseModalTitle', details.title || payload.name);
  setText('exerciseModalMeta', metaParts);
  setText('exerciseModalDescription', details.description || '');
  setText('exerciseModalWhy', details.why || '');
  setText('exerciseModalNote', noteText);
  const cueList = document.getElementById('exerciseModalCues');
  const avoidList = document.getElementById('exerciseModalAvoid');
  if (cueList) cueList.innerHTML = (details.cues || []).map((item) => `<li>${esc(item)}</li>`).join('');
  if (avoidList) avoidList.innerHTML = (details.avoid || []).map((item) => `<li>${esc(item)}</li>`).join('');
  const img = document.getElementById('exerciseModalImage');
  if (img) img.src = getExerciseArt(details.title || payload.name, details.category);
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeExerciseModal() {
  const modal = document.getElementById('exerciseModal');
  if (!modal) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function bindExerciseModalDelegation() {
  if (document.body.dataset.exerciseModalBound === 'true') return;
  document.body.dataset.exerciseModalBound = 'true';
  document.addEventListener('click', (event) => {
    const trigger = event.target.closest('[data-open-exercise]');
    if (trigger) {
      openExerciseModal({
        name: trigger.dataset.exName || 'Exercise',
        meta: trigger.dataset.exMeta || '',
        note: trigger.dataset.exNote || ''
      });
      return;
    }
    if (event.target.closest('[data-close-exercise-modal]')) {
      closeExerciseModal();
    }
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeExerciseModal();
  });
}

function renderExerciseList(weekNumber, dayIndex, exercises) {
  return exercises.map((exercise, exerciseIndex) => {
    const key = checkKey(weekNumber, dayIndex, exerciseIndex);
    const checked = Boolean(appState.checks[key]);
    const loadRecommendation = getLoadRecommendation(exercise);
    const meta = [exercise.sets ? `${exercise.sets} sets` : '', exercise.reps || '', exercise.intensity ? `@ ${exercise.intensity}` : ''].filter(Boolean).join(' • ');
    return `
      <div class="exercise-item ${checked ? 'completed' : ''}" data-check-wrapper="${key}">
        <input class="exercise-check" type="checkbox" data-check="${key}" ${checked ? 'checked' : ''} />
        <button class="exercise-item-main" type="button" data-open-exercise="1" data-ex-name="${esc(exercise.name)}" data-ex-meta="${esc(meta)}" data-ex-note="${esc(exercise.note || '')}">
          <div class="exercise-title-row">
            <p class="exercise-title">${esc(exercise.name)}</p>
            <span class="badge ${checked ? 'success' : 'subtle'}">${checked ? 'Done' : 'Pending'}</span>
          </div>
          ${meta ? `<p class="exercise-meta">${esc(meta)}</p>` : ''}
          ${loadRecommendation ? `<p class="exercise-load">${loadRecommendation}</p>` : ''}
          ${exercise.note ? `<p class="exercise-note">${esc(exercise.note)}</p>` : ''}
          <div class="exercise-footer-row">
            <span class="muted">Tap for movement details</span>
            <span class="exercise-detail-btn">View details</span>
          </div>
        </button>
      </div>
    `;
  }).join('');
}

function renderHome() {
  const { week, day } = getCurrentWeekAndDay();
  const completion = getWeekCompletion(appState.activeWeek);
  const todayCompletion = getDayCompletion(appState.activeWeek, appState.activeDay);
  const monthMeta = getMonthMeta(appState.activeWeek);
  const prs = getPRs();
  const split = resolveJumpSplit(week, appState.activeDay);
  const preview = day.exercises.slice(0, 5).map((exercise) => `
    <div class="preview-item">${renderExerciseTrigger(exercise)}</div>
  `).join('');

  els.home.innerHTML = `
    <div class="grid two-col">
      <article class="card">
        <div class="card-header">
          <div>
            <p class="eyebrow">Dashboard</p>
            <h3 class="card-title">Current block status</h3>
          </div>
          <span class="badge ${week.deload ? "warn" : ""}">${week.deload ? "Deload week" : `Month ${week.month}`}</span>
        </div>
        <div class="metric-grid">
          <div class="metric">
            <span class="metric-label">Today</span>
            <div class="metric-value">${day.short}</div>
            <div class="metric-sub">${day.type}</div>
          </div>
          <div class="metric">
            <span class="metric-label">Jump split</span>
            <div class="metric-value">${split.low}/${split.max}</div>
            <div class="metric-sub">low/max minutes</div>
          </div>
          <div class="metric">
            <span class="metric-label">Week completion</span>
            <div class="metric-value">${completion.percent}%</div>
            <div class="metric-sub">${completion.done} of ${completion.total} checks</div>
          </div>
          <div class="metric">
            <span class="metric-label">Today completion</span>
            <div class="metric-value">${todayCompletion.percent}%</div>
            <div class="metric-sub">${todayCompletion.done} of ${todayCompletion.total}</div>
          </div>
        </div>
        <div style="margin-top:16px">${progressBar(completion.percent)}</div>
        <div class="progress-meta"><span>${week.title}</span><span>${monthMeta ? monthMeta.theme : ''}</span></div>
        <div class="btn-row" style="margin-top:16px">
          <button class="btn btn-primary" data-action="go-today">Open today</button>
          <button class="btn btn-secondary" data-action="start-timer">Jump timer</button>
        </div>
      </article>

      <article class="card">
        <div class="card-header">
          <div>
            <p class="eyebrow">Records</p>
            <h3 class="card-title">PR tracker</h3>
          </div>
          <span class="badge subtle">Auto from weekly logs</span>
        </div>
        <div class="metric-grid">
          <div class="metric">
            <span class="metric-label">Best standing vertical</span>
            <div class="metric-value">${formatValue(prs.standing, ' in')}</div>
            <div class="metric-sub">Logged weekly</div>
          </div>
          <div class="metric">
            <span class="metric-label">Best approach jump</span>
            <div class="metric-value">${formatValue(prs.approach, ' in')}</div>
            <div class="metric-sub">Logged weekly</div>
          </div>
          <div class="metric">
            <span class="metric-label">Sleep target</span>
            <div class="metric-value">8+</div>
            <div class="metric-sub">hours per night</div>
          </div>
          <div class="metric">
            <span class="metric-label">Leg feel target</span>
            <div class="metric-value">7-10</div>
            <div class="metric-sub">keep bounce high</div>
          </div>
        </div>
      </article>
    </div>

    <div class="grid two-col" style="margin-top:14px">
      <article class="card">
        <div class="card-header">
          <div>
            <p class="eyebrow">Today</p>
            <h3 class="card-title">Workout preview</h3>
          </div>
          <span class="badge">${day.day}</span>
        </div>
        <div class="muted" style="margin-bottom:14px">Tap any movement to open a quick explanation, cues, and a visual placeholder.</div>
        <div class="workout-preview">${preview}</div>
      </article>

      <article class="card">
        <div class="card-header">
          <div>
            <p class="eyebrow">Weekly summary</p>
            <h3 class="card-title">What matters this week</h3>
          </div>
          <span class="badge ${week.deload ? "warn" : "success"}">${week.deload ? "Back off" : "Push quality"}</span>
        </div>
        <div class="chip-row">
          <span class="chip">${week.summary}</span>
          <span class="chip">${monthMeta ? monthMeta.title : week.title}</span>
          <span class="chip">${split.low} min low effort</span>
          <span class="chip">${split.max} min max effort</span>
        </div>
        <div class="hr"></div>
        <div class="muted">Use Program to browse the block, Today to check off the session, Tracker to log your weekly numbers, and Settings if you want Google sign-in with Firebase sync.</div>
      </article>
    </div>
  `;

  els.home.querySelector('[data-action="go-today"]').addEventListener('click', () => switchView('today'));
  els.home.querySelector('[data-action="start-timer"]').addEventListener('click', () => {
    switchView('today');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

function renderProgram() {
  const week = getWeek(appState.browseWeek);
  const completion = getWeekCompletion(appState.browseWeek);
  const current = appState.currentContext;
  els.program.innerHTML = `
    <div class="grid">
      <article class="card">
        <div class="card-header">
          <div>
            <p class="eyebrow">Program browser</p>
            <h3 class="card-title">Week ${week.week}</h3>
          </div>
          <label class="field-inline" style="min-width:128px">
            <span>Browse week</span>
            <select id="browseWeekSelect">${programData.map((entry) => `<option value="${entry.week}" ${entry.week === appState.browseWeek ? 'selected' : ''}>Week ${entry.week}</option>`).join('')}</select>
          </label>
        </div>
        <div class="muted">${esc(week.summary)}</div>
        <div class="badge-row" style="margin:14px 0 10px">
          <span class="badge">${esc(week.title)}</span>
          <span class="badge">Jump split ${week.jumpSplit.low}/${week.jumpSplit.max}</span>
          <span class="badge ${week.deload ? 'warn' : 'success'}">${week.deload ? 'Deload' : 'Build week'}</span>
          <span class="badge subtle">Current calendar: ${current.nextTrainingLabel}</span>
        </div>
        ${progressBar(completion.percent)}
        <div class="progress-meta"><span>Week completion</span><span>${completion.done}/${completion.total}</span></div>
      </article>

      <div class="program-day-list">
        ${week.days.map((day, dayIndex) => {
          const progress = getDayCompletion(week.week, dayIndex);
          return `
            <article class="program-day">
              <div class="card-header">
                <div>
                  <h4 class="card-title">${esc(day.day)} — ${esc(day.short)}</h4>
                  <div class="muted">${esc(day.focus)}</div>
                </div>
                <div class="badge-row">
                  <span class="badge subtle">${esc(day.type)}</span>
                  <span class="badge">${progress.percent}%</span>
                </div>
              </div>
              ${progressBar(progress.percent)}
              <div class="exercise-list" style="margin-top:12px">
                ${day.exercises.slice(0, 4).map((exercise) => `<div class="preview-item">${renderExerciseTrigger(exercise)}</div>`).join('')}
                ${day.exercises.length > 4 ? `<div class="empty-state">+ ${day.exercises.length - 4} more items inside this session.</div>` : ''}
              </div>
              <div class="btn-row" style="margin-top:12px">
                <button class="btn btn-secondary mini-btn" data-open-day="${dayIndex}">Open day</button>
                <button class="btn btn-ghost mini-btn" data-set-current="${dayIndex}">Make viewing day</button>
              </div>
            </article>
          `;
        }).join('')}
      </div>
    </div>
  `;

  $('#browseWeekSelect').addEventListener('change', (e) => {
    appState.browseWeek = Number(e.target.value);
    renderProgram();
  });
  els.program.querySelectorAll('[data-open-day]').forEach((btn) => {
    btn.addEventListener('click', () => {
      appState.activeWeek = appState.browseWeek;
      appState.activeDay = Number(btn.dataset.openDay);
      resetTimerState();
      persistState(false);
      syncGlobalSelectors();
      renderAll();
      switchView('today');
    });
  });
  els.program.querySelectorAll('[data-set-current]').forEach((btn) => {
    btn.addEventListener('click', () => {
      appState.activeWeek = appState.browseWeek;
      appState.activeDay = Number(btn.dataset.setCurrent);
      resetTimerState();
      persistState(false);
      syncGlobalSelectors();
      renderAll();
      showToast('Viewing day updated.');
    });
  });
}

function renderToday() {
  const selected = getSelectedWeekAndDay();
  const week = selected.week;
  const day = selected.day;
  const split = resolveJumpSplit(week, appState.activeDay);
  const completion = getDayCompletion(appState.activeWeek, appState.activeDay);
  const session = appState.sessionNotes[sessionKey(appState.activeWeek, appState.activeDay)] || { readiness: 7, note: "" };
  const viewingCurrent = selectionMatchesCurrent();
  const current = appState.currentContext;
  const restBanner = viewingCurrent && current && current.isRestDay
    ? `<article class="card slim rest-banner"><div class="badge warn">Sunday recovery day</div><div class="muted" style="margin-top:8px">The app points you to your next training session after your Sunday off day, but you can still browse any week or day you want.</div></article>`
    : "";

  els.today.innerHTML = `
    ${restBanner}
    <div class="grid two-col" ${restBanner ? 'style="margin-top:14px"' : ''}>
      <article class="card">
        <div class="card-header">
          <div>
            <p class="eyebrow">Today</p>
            <h3 class="card-title">Week ${week.week} • ${esc(day.day)} • ${esc(day.short)}</h3>
          </div>
          <div class="badge-row">
            <span class="badge subtle">${esc(day.type)}</span>
            <span class="badge">${completion.percent}% complete</span>
          </div>
        </div>
        <div class="muted">${esc(day.focus || week.summary || '')}</div>
        <div class="chip-row" style="margin-top:14px">
          <span class="chip">${viewingCurrent ? esc(current.label) : `Browsing Week ${week.week}`}</span>
          <span class="chip">Jump split ${split.low}/${split.max}</span>
          ${week.deload ? '<span class="chip">Deload week</span>' : ''}
        </div>
        <div class="day-strip" style="margin-top:16px">
          ${week.days.map((entry, idx) => {
            const dayProgress = getDayCompletion(week.week, idx);
            const isCalendarDay = current && week.week === current.week && idx === current.dayIndex;
            return `
              <button class="day-pill ${idx === appState.activeDay ? 'active' : ''}" data-today-day="${idx}">
                <div class="day-pill-title">${esc(entry.day)}</div>
                <div class="day-pill-meta">${esc(entry.short)} • ${dayProgress.percent}%${isCalendarDay ? ' • current' : ''}</div>
              </button>
            `;
          }).join('')}
        </div>
        <div class="hr"></div>
        ${progressBar(completion.percent)}
        <div class="progress-meta"><span>Session completion</span><span>${completion.done}/${completion.total} checks</span></div>
        <div class="btn-row" style="margin-top:14px">
          <button class="btn btn-ghost" id="todayResetChecksBtn">Clear session checks</button>
        </div>
      </article>

      <article class="card">
        <div class="card-header">
          <div>
            <p class="eyebrow">Jump timer</p>
            <h3 class="card-title">${isJumpFocused(day) ? 'Session timer ready' : 'Optional timer today'}</h3>
          </div>
          <span class="badge">${split.low}m + ${split.max}m</span>
        </div>
        <div class="muted" style="margin-bottom:14px">Use this for your low-effort block and your max-effort block. It follows the month’s programmed split automatically.</div>
        ${renderTimerMarkup()}
      </article>
    </div>

    <div class="grid two-col" style="margin-top:14px">
      <article class="card">
        <div class="card-header">
          <div>
            <p class="eyebrow">Checklist</p>
            <h3 class="card-title">Work for this session</h3>
          </div>
          <span class="badge subtle">${day.exercises.length} items</span>
        </div>
        <div class="muted" style="margin-bottom:14px">Tap any exercise card to see a quick description, cues, and a visual placeholder.</div>
        <div class="exercise-list">${renderExerciseList(week.week, appState.activeDay, day.exercises)}</div>
      </article>

      <article class="card">
        <div class="card-header">
          <div>
            <p class="eyebrow">Readiness</p>
            <h3 class="card-title">Log how it felt</h3>
          </div>
          <span class="badge subtle">${appState.authUser && appState.firebaseConfig.autoCloudSync ? 'Local + cloud' : 'Local save'}</span>
        </div>
        <div class="form-grid two-col">
          <div class="form-card">
            <label>
              <span>Readiness score</span>
              <div class="range-row">
                <input id="sessionReadiness" type="range" min="1" max="10" value="${esc(session.readiness || 7)}" />
                <div class="range-value"><span id="sessionReadinessValue">${esc(session.readiness || 7)}</span>/10</div>
              </div>
            </label>
          </div>
          <div class="metric compact">
            <span class="metric-label">Calendar status</span>
            <div class="metric-value">${viewingCurrent && current && current.isRestDay ? 'Recovery' : esc(day.day)}</div>
            <div class="metric-sub">${viewingCurrent ? 'Auto-detected from real date' : 'Manual browse mode'}</div>
          </div>
        </div>
        <div class="form-card" style="margin-top:12px">
          <label>
            <span>Session notes</span>
            <textarea id="sessionNoteInput" placeholder="Springy, flat, knees good, bar speed good, dunk attempts, anything worth keeping track of.">${esc(session.note || '')}</textarea>
          </label>
        </div>
        <div class="btn-row" style="margin-top:12px">
          <button class="btn btn-primary" id="saveSessionNote">Save session notes</button>
        </div>
      </article>
    </div>
  `;

  els.today.querySelectorAll('[data-today-day]').forEach((btn) => {
    btn.addEventListener('click', () => {
      appState.activeDay = Number(btn.dataset.todayDay);
      resetTimerState();
      persistState(false);
      syncGlobalSelectors();
      renderAll();
    });
  });
  els.today.querySelectorAll('[data-check]').forEach((input) => {
    input.addEventListener('change', () => {
      appState.checks[input.dataset.check] = input.checked;
      persistState();
      renderToday();
      renderHome();
      renderProgram();
    });
  });
  bindTimerEvents();
  renderTimerVisuals();
  bindIf('todayResetChecksBtn', 'click', resetTodayChecks);
  bindIf('sessionReadiness', 'input', (event) => {
    const out = $('#sessionReadinessValue');
    if (out) out.textContent = event.target.value;
  });
  bindIf('saveSessionNote', 'click', saveSessionNote);
}

document.addEventListener('DOMContentLoaded', bindExerciseModalDelegation);

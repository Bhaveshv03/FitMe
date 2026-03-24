const exerciseLibrary = {
  push: {
    bodyweight: [
      { name: "Push Up", muscle: "Chest", page: "Chest.html" },
      { name: "Diamond Push Up", muscle: "Triceps", page: "Triceps.html" },
      { name: "Elevated Pike Press", muscle: "Shoulders", page: "Shoulder.html" },
      { name: "Bench Dips", muscle: "Triceps", page: "Triceps.html" }
    ],
    dumbbells: [
      { name: "Dumbbell Incline Bench Press", muscle: "Chest", page: "Chest.html" },
      { name: "Dumbbell Seated Overhead Press", muscle: "Shoulders", page: "Shoulder.html" },
      { name: "Dumbbell Incline Chest Fly", muscle: "Chest", page: "Chest.html" },
      { name: "Dumbbell Overhead Tricep Extension", muscle: "Triceps", page: "Triceps.html" }
    ],
    fullgym: [
      { name: "Barbell Bench Press", muscle: "Chest", page: "Chest.html" },
      { name: "Barbell Incline Bench Press", muscle: "Chest", page: "Chest.html" },
      { name: "Barbell Overhead Press", muscle: "Shoulders", page: "Shoulder.html" },
      { name: "Skullcrusher", muscle: "Triceps", page: "Triceps.html" }
    ]
  },
  pull: {
    bodyweight: [
      { name: "Pull Up", muscle: "Lats", page: "Lats.html" },
      { name: "Chin Up", muscle: "Biceps", page: "Biceps.html" },
      { name: "Inverted Row", muscle: "Lats", page: "Lats.html" },
      { name: "Forearm Plank Row Hold", muscle: "Forearms", page: "Forearms.html" }
    ],
    dumbbells: [
      { name: "Dumbbell Row", muscle: "Lats", page: "Lats.html" },
      { name: "Dumbbell Shrug", muscle: "Traps", page: "Traps.html" },
      { name: "Hammer Curl", muscle: "Biceps", page: "Biceps.html" },
      { name: "Reverse Curl", muscle: "Forearms", page: "Forearms.html" }
    ],
    fullgym: [
      { name: "Barbell Bent Over Row", muscle: "Lats", page: "Lats.html" },
      { name: "Lat Pulldown Focus", muscle: "Lats", page: "Lats.html" },
      { name: "Barbell Curl", muscle: "Biceps", page: "Biceps.html" },
      { name: "Upright Row", muscle: "Traps", page: "Traps.html" }
    ]
  },
  legs: {
    bodyweight: [
      { name: "Bodyweight Squat", muscle: "Quads", page: "Quads.html" },
      { name: "Forward Lunge", muscle: "Glutes", page: "Glutes.html" },
      { name: "Glute Bridge", muscle: "Glutes", page: "Glutes.html" },
      { name: "Calf Raise", muscle: "Calves", page: "Calves.html" }
    ],
    dumbbells: [
      { name: "Goblet Squat", muscle: "Quads", page: "Quads.html" },
      { name: "Dumbbell Calf Raise", muscle: "Calves", page: "Calves.html" },
      { name: "Bulgarian Split Squat", muscle: "Hamstrings", page: "Hamstrings.html" },
      { name: "Dumbbell Romanian Deadlift Pattern", muscle: "Lower Back", page: "LowerBack.html" }
    ],
    fullgym: [
      { name: "High Bar Squat", muscle: "Quads", page: "Quads.html" },
      { name: "Deadlift", muscle: "Lower Back", page: "LowerBack.html" },
      { name: "Sumo Deadlift", muscle: "Glutes", page: "Glutes.html" },
      { name: "Barbell Calf Raise", muscle: "Calves", page: "Calves.html" }
    ]
  },
  core: {
    bodyweight: [
      { name: "Crunch", muscle: "Abdominals", page: "Abdominals.html" },
      { name: "Leg Raise", muscle: "Abdominals", page: "Abdominals.html" },
      { name: "Forearm Plank", muscle: "Abdominals", page: "Abdominals.html" },
      { name: "Russian Twist", muscle: "Obliques", page: "Obliques.html" }
    ],
    dumbbells: [
      { name: "Weighted Russian Twist", muscle: "Obliques", page: "Obliques.html" },
      { name: "Dumbbell Side Bend Pattern", muscle: "Obliques", page: "Obliques.html" },
      { name: "Leg Raise", muscle: "Abdominals", page: "Abdominals.html" },
      { name: "Plank Hold", muscle: "Abdominals", page: "Abdominals.html" }
    ],
    fullgym: [
      { name: "Cable Twist Pattern", muscle: "Obliques", page: "Obliques.html" },
      { name: "Leg Raise", muscle: "Abdominals", page: "Abdominals.html" },
      { name: "Crunch", muscle: "Abdominals", page: "Abdominals.html" },
      { name: "Back Extension Pattern", muscle: "Lower Back", page: "LowerBack.html" }
    ]
  }
};

const goalPresets = {
  strength: { sets: "4 sets", reps: "4-6 reps", rest: "Rest 90-150 sec", note: "Prioritize big compound lifts and full recovery." },
  hypertrophy: { sets: "3-4 sets", reps: "8-12 reps", rest: "Rest 60-90 sec", note: "Chase quality volume and controlled tempo." },
  fatloss: { sets: "3 sets", reps: "12-15 reps", rest: "Rest 30-45 sec", note: "Keep transitions brisk and stay moving." },
  mobility: { sets: "2-3 rounds", reps: "8-10 slow reps", rest: "Rest as needed", note: "Move with range, control, and lighter effort." }
};

const focusMap = {
  fullbody: ["push", "pull", "legs", "core"],
  upper: ["push", "pull"],
  lower: ["legs", "core"],
  push: ["push", "core"],
  pull: ["pull", "core"],
  core: ["core", "legs"]
};

const weeklyTemplates = {
  3: ["Full Body A", "Upper Strength", "Lower Strength"],
  4: ["Upper Push", "Lower Strength", "Upper Pull", "Lower Volume"],
  5: ["Push Strength", "Pull Strength", "Legs Strength", "Upper Volume", "Core + Conditioning"]
};

function getExercises(focus, equipment) {
  const buckets = focusMap[focus] || focusMap.fullbody;
  return buckets.flatMap((bucket) => exerciseLibrary[bucket][equipment] || []);
}

function buildSinglePlan(formData) {
  const preset = goalPresets[formData.goal];
  const allExercises = getExercises(formData.focus, formData.equipment);
  const selected = allExercises.slice(0, Math.min(6, allExercises.length));
  return {
    title: `${capitalize(formData.goal)} ${labelForFocus(formData.focus)} Session`,
    subtitle: `${capitalize(formData.profile)} profile • ${labelForEquipment(formData.equipment)} • ${preset.note}`,
    chips: [capitalize(formData.goal), capitalize(formData.profile), labelForEquipment(formData.equipment)],
    exercises: selected.map((exercise, index) => ({
      ...exercise,
      prescription: `${preset.sets} • ${preset.reps}`,
      rest: preset.rest,
      order: index + 1
    }))
  };
}

function buildWeeklyPlan(formData) {
  const preset = goalPresets[formData.goal];
  const template = weeklyTemplates[formData.days] || weeklyTemplates[3];
  const pools = {
    push: exerciseLibrary.push[formData.equipment],
    pull: exerciseLibrary.pull[formData.equipment],
    legs: exerciseLibrary.legs[formData.equipment],
    core: exerciseLibrary.core[formData.equipment]
  };

  return template.map((dayName) => {
    const lower = dayName.toLowerCase();
    let exercises = [];

    if (lower.includes("push")) exercises = [...pools.push, ...pools.core.slice(0, 1)];
    else if (lower.includes("pull")) exercises = [...pools.pull, ...pools.core.slice(0, 1)];
    else if (lower.includes("lower") || lower.includes("legs")) exercises = [...pools.legs, ...pools.core.slice(0, 1)];
    else exercises = [...pools.push.slice(0, 2), ...pools.pull.slice(0, 2), ...pools.legs.slice(0, 2)];

    return {
      name: dayName,
      cue: preset.note,
      exercises: exercises.slice(0, 5).map((exercise) => ({
        ...exercise,
        prescription: `${preset.sets} • ${preset.reps}`
      }))
    };
  });
}

function renderSinglePlan(plan) {
  return `
    <div class="plan-header">
      <h3>${plan.title}</h3>
      <p>${plan.subtitle}</p>
    </div>
    <div class="plan-meta">${plan.chips.map((chip) => `<span>${chip}</span>`).join("")}</div>
    <div class="exercise-list">
      ${plan.exercises.map((exercise) => `
        <article class="exercise-card">
          <h4>${exercise.order}. ${exercise.name}</h4>
          <div class="exercise-meta">${exercise.muscle} • ${exercise.prescription} • ${exercise.rest}</div>
          <a href="${exercise.page}">Open ${exercise.muscle} exercise page</a>
        </article>
      `).join("")}
    </div>
  `;
}

function renderWeeklyPlan(days, formData) {
  return `
    <div class="plan-header">
      <h3>${formData.days}-Day ${capitalize(formData.goal)} Routine</h3>
      <p>${capitalize(formData.profile)} profile • ${labelForEquipment(formData.equipment)} • balanced weekly split</p>
    </div>
    <div class="plan-meta">
      <span>${formData.days} training days</span>
      <span>${capitalize(formData.goal)} emphasis</span>
      <span>${labelForEquipment(formData.equipment)}</span>
    </div>
    <div class="weekly-list">
      ${days.map((day) => `
        <article class="day-card">
          <h4>${day.name}</h4>
          <p>${day.cue}</p>
          <div class="exercise-list">
            ${day.exercises.map((exercise) => `
              <div class="exercise-card">
                <h4>${exercise.name}</h4>
                <div class="exercise-meta">${exercise.muscle} • ${exercise.prescription}</div>
                <a href="${exercise.page}">View ${exercise.muscle}</a>
              </div>
            `).join("")}
          </div>
        </article>
      `).join("")}
    </div>
  `;
}

function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function labelForEquipment(value) {
  return {
    bodyweight: "Bodyweight only",
    dumbbells: "Dumbbells available",
    fullgym: "Full gym access"
  }[value] || value;
}

function labelForFocus(value) {
  return {
    fullbody: "Full Body",
    upper: "Upper Body",
    lower: "Lower Body",
    push: "Push",
    pull: "Pull",
    core: "Core"
  }[value] || value;
}

const generatorForm = document.getElementById("generator-form");
const generatorOutput = document.getElementById("generator-output");

if (generatorForm && generatorOutput) {
  const render = () => {
    const formData = Object.fromEntries(new FormData(generatorForm).entries());

    if (formData.mode === "weekly") {
      const weeklyPlan = buildWeeklyPlan(formData);
      generatorOutput.innerHTML = renderWeeklyPlan(weeklyPlan, formData);
      return;
    }

    const singlePlan = buildSinglePlan(formData);
    generatorOutput.innerHTML = renderSinglePlan(singlePlan);
  };

  generatorForm.addEventListener("submit", (event) => {
    event.preventDefault();
    render();
  });

  render();
}

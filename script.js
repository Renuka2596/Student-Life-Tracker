/* =========================================================
   STUDENT LIFE TRACKER
   COMPLETE script.js
   ========================================================= */


/* =========================================================
   DEFAULT DATA VERSION
   ---------------------------------------------------------
   New GitHub users -> default data automatically loads.
   Existing users -> their edited data remains saved.
   ========================================================= */

const DEFAULT_DATA_VERSION = "student-life-v2";


/* =========================================================
   STORAGE HELPERS
   ========================================================= */

function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function getFromStorage(key, defaultValue) {
    const saved = localStorage.getItem(key);

    if (!saved) {
        return defaultValue;
    }

    try {
        return JSON.parse(saved);
    } catch (error) {
        return defaultValue;
    }
}


/* =========================================================
   DEFAULT PROFILE DATA
   ========================================================= */

const DEFAULT_PROFILE = {
    name: "Renuka P",
    role: "Computer science student",
    register: "24UCS40",
    department: "CS",
    college: "Thiagarajar College",
    email: "24ucs40@tcarts.in",
    phone: "8270658590",
    year: "3rd year",
    about: "I am a CS student interested in software development."
};


/* =========================================================
   DEFAULT SKILLS
   ========================================================= */

const DEFAULT_SKILLS = [
    "Leadership",
    "Communication",
    "Java",
    "Achievements",
    "CS"
];


/* =========================================================
   DEFAULT ACADEMIC MARKS
   ========================================================= */

const DEFAULT_ACADEMIC_MARKS = {
    sem1: 81.75,
    sem2: 93.25,
    sem3: 88,
    sem4: 89
};


/* =========================================================
   DEFAULT TRANSPORT DETAILS
   ========================================================= */

const DEFAULT_TRANSPORT_DETAILS = {
    mode: "Scooty",
    from: "Home",
    to: "College",
    vehicle: "Scooty",
    time: "20 minutes",
    distance: "4.2 km"
};


/* =========================================================
   DEFAULT DAILY BUDGET
   ---------------------------------------------------------
   Daily Budget = ₹50
   ========================================================= */

const DEFAULT_DAILY_BUDGET = 50;


/* =========================================================
   DEFAULT 10 DAYS EXPENSE
   ---------------------------------------------------------
   6 days = ₹36.50
   4 days = ₹50

   Dates used:
   Aug 26
   Aug 27
   Aug 28
   Aug 31
   Sep 1
   Sep 7
   Sep 8
   Sep 9
   Sep 10
   Sep 11
   ========================================================= */

const DEFAULT_TRANSPORT_EXPENSES = [
    {
        id: 1,
        date: "2026-08-26",
        transport: "Scooty",
        route: "Home → College",
        amount: 36.50
    },
    {
        id: 2,
        date: "2026-08-27",
        transport: "Scooty",
        route: "Home → College",
        amount: 36.50
    },
    {
        id: 3,
        date: "2026-08-28",
        transport: "Scooty",
        route: "Home → College",
        amount: 36.50
    },
    {
        id: 4,
        date: "2026-08-31",
        transport: "Scooty",
        route: "Home → College",
        amount: 36.50
    },
    {
        id: 5,
        date: "2026-09-01",
        transport: "Scooty",
        route: "Home → College",
        amount: 36.50
    },
    {
        id: 6,
        date: "2026-09-07",
        transport: "Scooty",
        route: "Home → College",
        amount: 36.50
    },
    {
        id: 7,
        date: "2026-09-08",
        transport: "Scooty",
        route: "Home → College",
        amount: 50
    },
    {
        id: 8,
        date: "2026-09-09",
        transport: "Scooty",
        route: "Home → College",
        amount: 50
    },
    {
        id: 9,
        date: "2026-09-10",
        transport: "Scooty",
        route: "Home → College",
        amount: 50
    },
    {
        id: 10,
        date: "2026-09-11",
        transport: "Scooty",
        route: "Home → College",
        amount: 50
    }
];


/* =========================================================
   INITIALIZE DEFAULT DATA
   ---------------------------------------------------------
   Version system makes sure your latest default data
   is loaded once when this version is published.
   ========================================================= */

const savedDataVersion =
    localStorage.getItem("studentLifeDefaultVersion");

if (savedDataVersion !== DEFAULT_DATA_VERSION) {

    saveToStorage(
        "profileData",
        DEFAULT_PROFILE
    );

    saveToStorage(
        "skills",
        DEFAULT_SKILLS
    );

    saveToStorage(
        "academicMarks",
        DEFAULT_ACADEMIC_MARKS
    );

    saveToStorage(
        "transportDetails",
        DEFAULT_TRANSPORT_DETAILS
    );

    saveToStorage(
        "dailyBudget",
        DEFAULT_DAILY_BUDGET
    );

    saveToStorage(
        "transportExpenses",
        DEFAULT_TRANSPORT_EXPENSES
    );

    localStorage.setItem(
        "studentLifeDefaultVersion",
        DEFAULT_DATA_VERSION
    );
}


/* =========================================================
   GENERAL HELPERS
   ========================================================= */

function formatMoney(amount) {
    return "₹" + Number(amount || 0).toLocaleString(
        "en-IN",
        {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }
    );
}


function getTodayISO() {
    const d = new Date();

    return `${d.getFullYear()}-${String(
        d.getMonth() + 1
    ).padStart(2, "0")}-${String(
        d.getDate()
    ).padStart(2, "0")}`;
}


function formatDate(dateString) {
    if (!dateString) {
        return "—";
    }

    const d = new Date(
        dateString + "T00:00:00"
    );

    if (isNaN(d.getTime())) {
        return dateString;
    }

    return d.toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    );
}


function getTransportIcon(mode) {
    const icons = {
        Scooty: "🛵",
        Bike: "🏍️",
        Bus: "🚌",
        Auto: "🛺",
        Train: "🚆",
        Car: "🚗",
        Walk: "🚶"
    };

    return icons[mode] || "🛵";
}


/* =========================================================
   NAVIGATION
   ========================================================= */

function showPage(pageId) {

    document
        .querySelectorAll(".page")
        .forEach(page => {
            page.classList.remove("active");
        });

    const page =
        document.getElementById(pageId);

    if (page) {
        page.classList.add("active");
    }

    document
        .querySelectorAll(".nav-item")
        .forEach(item => {

            item.classList.remove("active");

            const text =
                item.getAttribute("onclick") || "";

            if (
                text.includes(
                    `showPage('${pageId}'`
                )
            ) {
                item.classList.add("active");
            }
        });

    const headings = {
        home: "Dashboard",
        profile: "My Profile",
        academic: "Academic Performance",
        transport: "Transport & Expenses"
    };

    const heading =
        document.getElementById("pageHeading");

    if (heading) {
        heading.textContent =
            headings[pageId] || "Dashboard";
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


function goToPage(pageId) {
    showPage(pageId);
}


/* =========================================================
   PROFILE
   ========================================================= */

let profileData = getFromStorage(
    "profileData",
    DEFAULT_PROFILE
);


/* ---------- Open Profile Modal ---------- */

function openProfileModal() {

    document.getElementById(
        "editName"
    ).value = profileData.name || "";

    document.getElementById(
        "editRole"
    ).value = profileData.role || "";

    document.getElementById(
        "editRegister"
    ).value = profileData.register || "";

    document.getElementById(
        "editDepartment"
    ).value = profileData.department || "";

    document.getElementById(
        "editCollege"
    ).value = profileData.college || "";

    document.getElementById(
        "editEmail"
    ).value = profileData.email || "";

    document.getElementById(
        "editPhone"
    ).value = profileData.phone || "";

    document.getElementById(
        "editYear"
    ).value = profileData.year || "";

    document.getElementById(
        "editAbout"
    ).value = profileData.about || "";

    document
        .getElementById("profileModal")
        .classList.add("show");
}


/* ---------- Close Profile Modal ---------- */

function closeProfileModal() {

    document
        .getElementById("profileModal")
        .classList.remove("show");
}


/* ---------- Save Profile ---------- */

function saveProfile() {

    const name =
        document.getElementById(
            "editName"
        ).value.trim();

    const role =
        document.getElementById(
            "editRole"
        ).value.trim();

    const register =
        document.getElementById(
            "editRegister"
        ).value.trim();

    const department =
        document.getElementById(
            "editDepartment"
        ).value.trim();

    const college =
        document.getElementById(
            "editCollege"
        ).value.trim();

    const email =
        document.getElementById(
            "editEmail"
        ).value.trim();

    const phone =
        document.getElementById(
            "editPhone"
        ).value.trim();

    const year =
        document.getElementById(
            "editYear"
        ).value.trim();

    const about =
        document.getElementById(
            "editAbout"
        ).value.trim();

    if (!name) {
        alert("Please enter your name.");
        return;
    }

    /* Email validation */

    if (email) {

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

        if (!emailPattern.test(email)) {

            alert(
                "Please enter a valid email address."
            );

            document
                .getElementById("editEmail")
                .focus();

            return;
        }
    }

    /* Phone validation */

    if (phone) {

        const phonePattern =
            /^[6-9][0-9]{9}$/;

        if (!phonePattern.test(phone)) {

            alert(
                "Please enter a valid 10-digit phone number starting with 6, 7, 8 or 9."
            );

            document
                .getElementById("editPhone")
                .focus();

            return;
        }
    }

    profileData = {
        name,
        role,
        register,
        department,
        college,
        email,
        phone,
        year,
        about
    };

    saveToStorage(
        "profileData",
        profileData
    );

    updateProfileUI();
    closeProfileModal();
}


/* ---------- Update Profile UI ---------- */

function updateProfileUI() {

    const name =
        profileData.name || "Student";

    document.getElementById(
        "profileName"
    ).textContent = name;

    document.getElementById(
        "profileRole"
    ).textContent =
        profileData.role || "Student";

    document.getElementById(
        "profileRegister"
    ).textContent =
        profileData.register || "Not added";

    document.getElementById(
        "profileDepartment"
    ).textContent =
        profileData.department || "Not added";

    document.getElementById(
        "profileCollege"
    ).textContent =
        profileData.college || "Not added";

    document.getElementById(
        "profileEmail"
    ).textContent =
        profileData.email || "Not added";

    document.getElementById(
        "profilePhone"
    ).textContent =
        profileData.phone || "Not added";

    document.getElementById(
        "profileYear"
    ).textContent =
        profileData.year || "Not added";

    document.getElementById(
        "profileAbout"
    ).textContent =
        profileData.about ||
        "Add a short introduction about yourself.";

    const letter =
        name.charAt(0).toUpperCase() || "S";

    const profileAvatar =
        document.getElementById(
            "profileAvatar"
        );

    if (profileAvatar) {
        profileAvatar.textContent = letter;
    }

    const sideAvatar =
        document.getElementById(
            "sideAvatar"
        );

    if (sideAvatar) {
        sideAvatar.textContent = letter;
    }

    const headerAvatar =
        document.getElementById(
            "headerAvatar"
        );

    if (headerAvatar) {
        headerAvatar.textContent = letter;
    }

    const sideName =
        document.getElementById(
            "sideName"
        );

    if (sideName) {
        sideName.textContent = name;
    }

    const headerName =
        document.getElementById(
            "headerName"
        );

    if (headerName) {
        headerName.textContent = name;
    }

    const welcomeName =
        document.getElementById(
            "welcomeName"
        );

    if (welcomeName) {
        welcomeName.textContent =
            `Hi, ${name}!`;
    }

    updateProfileCompletion();
}


/* ---------- Profile Completion ---------- */

function updateProfileCompletion() {

    const fields = [
        profileData.name,
        profileData.role,
        profileData.register,
        profileData.department,
        profileData.college,
        profileData.email,
        profileData.phone,
        profileData.year,
        profileData.about
    ];

    const completed =
        fields.filter(
            value =>
                String(value || "")
                    .trim() !== ""
        ).length;

    const percent =
        Math.round(
            completed /
            fields.length *
            100
        );

    const value =
        document.getElementById(
            "profileCompletionValue"
        );

    if (value) {
        value.textContent =
            percent + "%";
    }

    const bar =
        document.getElementById(
            "profileCompletionBar"
        );

    if (bar) {
        bar.style.width =
            percent + "%";
    }

    let message =
        "Start by adding your profile details.";

    if (percent === 100) {

        message =
            "Excellent! Your profile is complete.";

    } else if (percent >= 75) {

        message =
            "Almost complete! Add the remaining details.";

    } else if (percent >= 50) {

        message =
            "Good progress! Keep updating your profile.";
    }

    const messageElement =
        document.getElementById(
            "profileCompletionMessage"
        );

    if (messageElement) {
        messageElement.textContent =
            message;
    }
}


/* =========================================================
   SKILLS
   ========================================================= */

let skills = getFromStorage(
    "skills",
    DEFAULT_SKILLS
);

let editingSkillIndex = -1;
let deletingSkillIndex = -1;


/* ---------- Display Skills ---------- */

function displaySkills() {

    const container =
        document.getElementById(
            "skillsContainer"
        );

    if (!container) {
        return;
    }

    container.innerHTML = "";

    if (!skills.length) {

        container.innerHTML = `
            <div class="skills-empty">
                <div>💡</div>
                <p>No skills added yet.</p>
            </div>
        `;

        return;
    }

    skills.forEach(
        (skill, index) => {

            const el =
                document.createElement("div");

            el.className =
                "skill-item";

            el.innerHTML = `
                <span>${skill}</span>

                <div class="skill-actions">

                    <button
                        class="edit-skill"
                        onclick="editSkill(${index})">
                        ✏️
                    </button>

                    <button
                        class="delete-skill"
                        onclick="deleteSkill(${index})">
                        🗑️
                    </button>

                </div>
            `;

            container.appendChild(el);
        }
    );
}


/* ---------- Open Skill Modal ---------- */

function openSkillModal() {

    editingSkillIndex = -1;

    document.getElementById(
        "skillModalTitle"
    ).textContent = "Add Skill";

    document.getElementById(
        "skillInput"
    ).value = "";

    document
        .getElementById("skillModal")
        .classList.add("show");
}


/* ---------- Close Skill Modal ---------- */

function closeSkillModal() {

    document
        .getElementById("skillModal")
        .classList.remove("show");
}


/* ---------- Save Skill ---------- */

function saveSkill() {

    const value =
        document.getElementById(
            "skillInput"
        ).value.trim();

    if (!value) {
        alert("Please enter a skill.");
        return;
    }

    if (editingSkillIndex !== -1) {

        skills[editingSkillIndex] =
            value;

    } else {

        skills.push(value);
    }

    saveToStorage(
        "skills",
        skills
    );

    displaySkills();
    closeSkillModal();
}


/* ---------- Edit Skill ---------- */

function editSkill(index) {

    editingSkillIndex = index;

    document.getElementById(
        "skillModalTitle"
    ).textContent = "Edit Skill";

    document.getElementById(
        "skillInput"
    ).value = skills[index];

    document
        .getElementById("skillModal")
        .classList.add("show");
}


/* ---------- Delete Skill ---------- */

function deleteSkill(index) {

    deletingSkillIndex = index;

    document.getElementById(
        "deleteSkillName"
    ).textContent =
        `"${skills[index]}"`;

    document
        .getElementById("deleteModal")
        .classList.add("show");
}


/* ---------- Close Delete Skill Modal ---------- */

function closeDeleteModal() {

    document
        .getElementById("deleteModal")
        .classList.remove("show");

    deletingSkillIndex = -1;
}


/* ---------- Confirm Delete Skill ---------- */

function confirmDeleteSkill() {

    if (deletingSkillIndex !== -1) {

        skills.splice(
            deletingSkillIndex,
            1
        );

        saveToStorage(
            "skills",
            skills
        );

        displaySkills();
        closeDeleteModal();
    }
}


/* =========================================================
   ACADEMIC
   ========================================================= */

let academicMarks = getFromStorage(
    "academicMarks",
    DEFAULT_ACADEMIC_MARKS
);


/* ---------- Open Academic Modal ---------- */

function openAcademicModal() {

    document.getElementById(
        "sem1Input"
    ).value =
        academicMarks.sem1 ?? "";

    document.getElementById(
        "sem2Input"
    ).value =
        academicMarks.sem2 ?? "";

    document.getElementById(
        "sem3Input"
    ).value =
        academicMarks.sem3 ?? "";

    document.getElementById(
        "sem4Input"
    ).value =
        academicMarks.sem4 ?? "";

    document
        .getElementById("academicModal")
        .classList.add("show");
}


/* ---------- Close Academic Modal ---------- */

function closeAcademicModal() {

    document
        .getElementById("academicModal")
        .classList.remove("show");
}


/* ---------- Save Academic Marks ---------- */

function saveAcademicMarks() {

    const ids = [
        "sem1Input",
        "sem2Input",
        "sem3Input",
        "sem4Input"
    ];

    const values =
        ids.map(id => {

            const value =
                document
                    .getElementById(id)
                    .value
                    .trim();

            return value === ""
                ? null
                : Number(value);
        });

    const invalid =
        values.some(
            value =>
                value !== null &&
                (
                    isNaN(value) ||
                    value < 0 ||
                    value > 100
                )
        );

    if (invalid) {

        alert(
            "Percentage must be between 0 and 100."
        );

        return;
    }

    academicMarks = {
        sem1: values[0],
        sem2: values[1],
        sem3: values[2],
        sem4: values[3]
    };

    saveToStorage(
        "academicMarks",
        academicMarks
    );

    updateAcademicUI();
    closeAcademicModal();
}


/* ---------- Update Academic UI ---------- */

function updateAcademicUI() {

    const semesters = [
        {
            name: "Semester 1",
            short: "Sem 1",
            value: academicMarks.sem1
        },
        {
            name: "Semester 2",
            short: "Sem 2",
            value: academicMarks.sem2
        },
        {
            name: "Semester 3",
            short: "Sem 3",
            value: academicMarks.sem3
        },
        {
            name: "Semester 4",
            short: "Sem 4",
            value: academicMarks.sem4
        }
    ];

    const list =
        document.getElementById(
            "semesterList"
        );

    if (!list) {
        return;
    }

    list.innerHTML = "";

    semesters.forEach(
        (sem, index) => {

            const value =
                sem.value == null
                    ? "Not added"
                    : sem.value + "%";

            const progress =
                sem.value == null
                    ? 0
                    : sem.value;

            const row =
                document.createElement("div");

            row.className =
                "semester-item";

            row.innerHTML = `
                <div class="semester-info">

                    <div class="semester-number">
                        ${index + 1}
                    </div>

                    <div>

                        <strong>
                            ${sem.name}
                        </strong>

                        <span>
                            Semester performance
                        </span>

                        <div class="progress-track">

                            <div
                                class="progress-fill"
                                style="width:${progress}%">
                            </div>

                        </div>

                    </div>

                </div>

                <div class="semester-percent">
                    ${value}
                </div>
            `;

            list.appendChild(row);
        }
    );

    updateAcademicSummary(
        semesters
    );

    updateAcademicImprovement(
        semesters
    );

    updateAcademicCombination(
        semesters
    );

    updateDashboardAcademic();
}


/* =========================================================
   ACADEMIC SUMMARY
   ========================================================= */

function updateAcademicSummary(
    semesters
) {

    const valid =
        semesters.filter(
            sem =>
                sem.value !== null &&
                sem.value !== undefined &&
                !isNaN(sem.value)
        );

    const avgEl =
        document.getElementById(
            "overallAverage"
        );

    const bestEl =
        document.getElementById(
            "bestSemester"
        );

    const highEl =
        document.getElementById(
            "highestPercentage"
        );

    const latestEl =
        document.getElementById(
            "latestChange"
        );

    if (!valid.length) {

        if (avgEl) avgEl.textContent = "—";
        if (bestEl) bestEl.textContent = "—";
        if (highEl) highEl.textContent = "—";
        if (latestEl) latestEl.textContent = "—";

        return;
    }

    /* Overall Average */

    const total =
        valid.reduce(
            (sum, semester) =>
                sum + Number(semester.value),
            0
        );

    const average =
        total / valid.length;

    /* Highest */

    const highest =
        Math.max(
            ...valid.map(
                semester =>
                    Number(semester.value)
            )
        );

    /* Best Semester */

    const best =
        valid.find(
            semester =>
                Number(semester.value) ===
                highest
        );

    if (avgEl) {

        avgEl.textContent =
            average.toFixed(2) + "%";
    }

    if (bestEl) {

        bestEl.textContent =
            best.short;
    }

    if (highEl) {

        highEl.textContent =
            highest + "%";
    }

    /* Latest adjacent change */

    let latestChange = null;

    for (
        let i = 1;
        i < semesters.length;
        i++
    ) {

        const previous =
            semesters[i - 1].value;

        const current =
            semesters[i].value;

        if (
            previous !== null &&
            previous !== undefined &&
            current !== null &&
            current !== undefined
        ) {

            latestChange =
                Number(current) -
                Number(previous);
        }
    }

    if (latestEl) {

        latestEl.textContent =
            latestChange === null
                ? "—"
                : formatChange(
                    latestChange
                );
    }
}


/* =========================================================
   ACADEMIC IMPROVEMENT
   ========================================================= */

function updateAcademicImprovement(
    semesters
) {

    const container =
        document.getElementById(
            "improvementList"
        );

    const insight =
        document.getElementById(
            "academicInsight"
        );

    if (!container) {
        return;
    }

    container.innerHTML = "";

    const comparisons = [];

    for (
        let i = 1;
        i < semesters.length;
        i++
    ) {

        const previous =
            semesters[i - 1];

        const current =
            semesters[i];

        if (
            previous.value !== null &&
            previous.value !== undefined &&
            current.value !== null &&
            current.value !== undefined
        ) {

            comparisons.push({

                previous,
                current,

                change:
                    Number(current.value) -
                    Number(previous.value)
            });

        } else {

            comparisons.push({

                previous,
                current,

                change: null
            });
        }
    }

    comparisons.forEach(
        comparison => {

            const {
                previous,
                current,
                change
            } = comparison;

            const item =
                document.createElement("div");

            item.className =
                "improvement-item";

            if (change === null) {

                item.innerHTML = `
                    <div class="improvement-left">

                        <span class="improvement-arrow">
                            →
                        </span>

                        <div>

                            <strong>
                                ${previous.short}
                                →
                                ${current.short}
                            </strong>

                            <small>
                                Add both semester marks
                            </small>

                        </div>

                    </div>

                    <strong class="improvement-value">
                        —
                    </strong>
                `;

            } else {

                const arrow =
                    change > 0
                        ? "↑"
                        : change < 0
                            ? "↓"
                            : "→";

                const className =
                    change > 0
                        ? "change-positive"
                        : change < 0
                            ? "change-negative"
                            : "";

                item.classList.add(
                    className
                );

                item.innerHTML = `
                    <div class="improvement-left">

                        <span class="improvement-arrow">
                            ${arrow}
                        </span>

                        <div>

                            <strong>
                                ${previous.short}
                                →
                                ${current.short}
                            </strong>

                            <small>
                                ${previous.value}%
                                →
                                ${current.value}%
                            </small>

                        </div>

                    </div>

                    <strong class="improvement-value">
                        ${formatChange(change)}
                    </strong>
                `;
            }

            container.appendChild(item);
        }
    );

    /* Academic Insight */

    const valid =
        semesters.filter(
            semester =>
                semester.value !== null &&
                semester.value !== undefined
        );

    if (!insight) {
        return;
    }

    if (valid.length < 2) {

        insight.textContent =
            "Add at least two semester marks to see performance insights.";

        return;
    }

    const first =
        Number(valid[0].value);

    const latest =
        Number(
            valid[valid.length - 1].value
        );

    const totalChange =
        latest - first;

    if (totalChange > 0) {

        insight.textContent =
            `Great! Your performance has improved by ${totalChange.toFixed(2)}% from ${valid[0].short} to ${valid[valid.length - 1].short}.`;

    } else if (totalChange < 0) {

        insight.textContent =
            `Your performance has decreased by ${Math.abs(totalChange).toFixed(2)}%. Focus on improving your next semester.`;

    } else {

        insight.textContent =
            "Your performance is stable across the recorded semesters.";
    }
}


/* =========================================================
   SEMESTER COMBINATION
   ========================================================= */

function updateAcademicCombination(
    semesters
) {

    const container =
        document.getElementById(
            "combinationGrid"
        );

    if (!container) {
        return;
    }

    container.innerHTML = "";

    const pairs = [
        {
            title: "Sem 1 + Sem 2",
            first: semesters[0].value,
            second: semesters[1].value
        },
        {
            title: "Sem 2 + Sem 3",
            first: semesters[1].value,
            second: semesters[2].value
        },
        {
            title: "Sem 3 + Sem 4",
            first: semesters[2].value,
            second: semesters[3].value
        }
    ];

    pairs.forEach(pair => {

        const box =
            document.createElement("div");

        box.className =
            "combination-box";

        if (
            pair.first !== null &&
            pair.second !== null &&
            pair.first !== undefined &&
            pair.second !== undefined
        ) {

            const average =
                (
                    Number(pair.first) +
                    Number(pair.second)
                ) / 2;

            box.innerHTML = `
                <div class="combination-top">

                    <strong>
                        ${pair.title}
                    </strong>

                    <span>
                        ${average.toFixed(2)}%
                    </span>

                </div>

                <div class="combination-progress">

                    <div
                        style="width:${average}%">
                    </div>

                </div>

                <small>
                    Average performance
                </small>
            `;

        } else {

            box.innerHTML = `
                <div class="combination-top">

                    <strong>
                        ${pair.title}
                    </strong>

                    <span>
                        —
                    </span>

                </div>

                <div class="combination-progress">

                    <div style="width:0%">
                    </div>

                </div>

                <small>
                    Add both semester marks
                </small>
            `;
        }

        container.appendChild(box);
    });


    /* Sem 1 - Sem 4 Overall Average */

    const valid =
        semesters.filter(
            semester =>
                semester.value !== null &&
                semester.value !== undefined
        );

    if (valid.length) {

        const overall =
            valid.reduce(
                (sum, semester) =>
                    sum + Number(semester.value),
                0
            ) / valid.length;

        const box =
            document.createElement("div");

        box.className =
            "combination-box highlight";

        box.innerHTML = `
            <div class="combination-top">

                <strong>
                    Sem 1 - Sem 4
                </strong>

                <span>
                    ${overall.toFixed(2)}%
                </span>

            </div>

            <div class="combination-progress">

                <div
                    style="width:${overall}%">
                </div>

            </div>

            <small>
                Overall average
            </small>
        `;

        container.appendChild(box);
    }
}


/* =========================================================
   FORMAT ACADEMIC CHANGE
   ========================================================= */

function formatChange(change) {

    const number =
        Number(change).toFixed(2);

    if (change > 0) {
        return "+" + number + "%";
    }

    return number + "%";
}


/* =========================================================
   DASHBOARD ACADEMIC
   ========================================================= */

function updateDashboardAcademic() {

    const dash =
        document.getElementById(
            "dashAcademic"
        );

    const note =
        document.getElementById(
            "dashAcademicNote"
        );

    const container =
        document.getElementById(
            "dashboardAcademicList"
        );

    const values = [
        academicMarks.sem1,
        academicMarks.sem2,
        academicMarks.sem3,
        academicMarks.sem4
    ];

    const valid =
        values.filter(
            value =>
                value !== null &&
                value !== undefined &&
                !isNaN(value)
        );

    if (!valid.length) {

        if (dash) {
            dash.textContent = "—";
        }

        if (note) {
            note.textContent =
                "Add your marks";
        }

    } else {

        const average =
            valid.reduce(
                (sum, value) =>
                    sum + Number(value),
                0
            ) / valid.length;

        if (dash) {

            dash.textContent =
                average.toFixed(2) + "%";
        }

        if (note) {

            note.textContent =
                valid.length +
                " semester" +
                (
                    valid.length > 1
                        ? "s"
                        : ""
                ) +
                " added";
        }
    }

    if (!container) {
        return;
    }

    if (!valid.length) {

        container.className =
            "dashboard-academic-empty";

        container.innerHTML = `
            <div>📊</div>

            <p>
                No academic marks added yet.
            </p>

            <button
                class="primary-small"
                onclick="goToPage('academic')">
                Add Marks
            </button>
        `;

        return;
    }

    container.className =
        "dashboard-academic-list";

    container.innerHTML = "";

    values.forEach(
        (value, index) => {

            const item =
                document.createElement("div");

            item.className =
                "dash-semester";

            item.innerHTML = `
                <div>

                    <span>
                        Sem ${index + 1}
                    </span>

                    <div class="dash-progress">

                        <div
                            style="width:${value || 0}%">
                        </div>

                    </div>

                </div>

                <strong>
                    ${
                        value !== null &&
                        value !== undefined
                            ? value + "%"
                            : "—"
                    }
                </strong>
            `;

            container.appendChild(item);
        }
    );
}


/* =========================================================
   TRANSPORT
   ========================================================= */

let transportDetails =
    getFromStorage(
        "transportDetails",
        DEFAULT_TRANSPORT_DETAILS
    );


/* ---------- Open Transport Modal ---------- */

function openTransportModal() {

    document.getElementById(
        "transportModalTitle"
    ).textContent =
        transportDetails.mode
            ? "Edit Transport"
            : "Add Transport";

    document.getElementById(
        "transportModeInput"
    ).value =
        transportDetails.mode || "";

    document.getElementById(
        "fromInput"
    ).value =
        transportDetails.from || "";

    document.getElementById(
        "toInput"
    ).value =
        transportDetails.to || "";

    document.getElementById(
        "vehicleInput"
    ).value =
        transportDetails.vehicle || "";

    document.getElementById(
        "timeInput"
    ).value =
        transportDetails.time || "";

    document.getElementById(
        "distanceInput"
    ).value =
        transportDetails.distance || "";

    document
        .getElementById("transportModal")
        .classList.add("show");
}


/* ---------- Close Transport Modal ---------- */

function closeTransportModal() {

    document
        .getElementById("transportModal")
        .classList.remove("show");
}


/* ---------- Save Transport ---------- */

function saveTransport() {

    const mode =
        document.getElementById(
            "transportModeInput"
        ).value;

    const from =
        document.getElementById(
            "fromInput"
        ).value.trim();

    const to =
        document.getElementById(
            "toInput"
        ).value.trim();

    const vehicle =
        document.getElementById(
            "vehicleInput"
        ).value.trim();

    const time =
        document.getElementById(
            "timeInput"
        ).value.trim();

    const distance =
        document.getElementById(
            "distanceInput"
        ).value.trim();

    if (!mode) {

        alert(
            "Please select transport mode."
        );

        return;
    }

    if (!from || !to) {

        alert(
            "Please enter From and To locations."
        );

        return;
    }

    if (!vehicle) {

        alert(
            "Please enter vehicle details."
        );

        return;
    }

    transportDetails = {
        mode,
        from,
        to,
        vehicle,
        time,
        distance
    };

    saveToStorage(
        "transportDetails",
        transportDetails
    );

    updateTransportUI();
    closeTransportModal();
}


/* ---------- Update Transport UI ---------- */

function updateTransportUI() {

    const has =
        transportDetails.mode &&
        transportDetails.from &&
        transportDetails.to;

    const empty =
        document.getElementById(
            "transportEmptyState"
        );

    const view =
        document.getElementById(
            "transportDetailsView"
        );

    if (!has) {

        if (empty) {
            empty.classList.remove(
                "hidden"
            );
        }

        if (view) {
            view.classList.add(
                "hidden"
            );
        }

        document.getElementById(
            "transportMode"
        ).textContent =
            "Not added";

        document.getElementById(
            "transportRoute"
        ).textContent =
            "Not added";

        document.getElementById(
            "dashTransportMode"
        ).textContent =
            "Not added";

        document.getElementById(
            "dashTransportRoute"
        ).textContent =
            "Add transport details";

        return;
    }

    if (empty) {
        empty.classList.add(
            "hidden"
        );
    }

    if (view) {
        view.classList.remove(
            "hidden"
        );
    }

    const icon =
        getTransportIcon(
            transportDetails.mode
        );

    document.getElementById(
        "transportModeIcon"
    ).textContent =
        icon;

    document.getElementById(
        "dashTransportIcon"
    ).textContent =
        icon;

    document.getElementById(
        "transportMode"
    ).textContent =
        transportDetails.mode;

    document.getElementById(
        "transportRoute"
    ).textContent =
        `${transportDetails.from} → ${transportDetails.to}`;

    document.getElementById(
        "dashTransportMode"
    ).textContent =
        transportDetails.mode;

    document.getElementById(
        "dashTransportRoute"
    ).textContent =
        `${transportDetails.from} → ${transportDetails.to}`;

    document.getElementById(
        "fromLocation"
    ).textContent =
        transportDetails.from;

    document.getElementById(
        "toLocation"
    ).textContent =
        transportDetails.to;

    document.getElementById(
        "transportType"
    ).textContent =
        transportDetails.mode;

    document.getElementById(
        "vehicleName"
    ).textContent =
        transportDetails.vehicle || "—";

    document.getElementById(
        "travelTime"
    ).textContent =
        transportDetails.time || "—";

    document.getElementById(
        "travelDistance"
    ).textContent =
        transportDetails.distance || "—";

    const dash =
        document.getElementById(
            "dashboardTransportContent"
        );

    if (dash) {

        dash.className =
            "dashboard-transport-main";

        dash.innerHTML = `
            <div class="dashboard-route-icon">
                ${icon}
            </div>

            <div class="dashboard-route-info">

                <strong>
                    ${transportDetails.from}
                    →
                    ${transportDetails.to}
                </strong>

                <span>
                    ${transportDetails.mode}
                    •
                    ${transportDetails.distance || "Distance not added"}
                </span>

            </div>

            <div class="dashboard-route-expense">

                <span>
                    Travel Time
                </span>

                <strong>
                    ${transportDetails.time || "—"}
                </strong>

            </div>
        `;
    }
}


/* =========================================================
   EXPENSES
   ========================================================= */

let transportExpenses =
    getFromStorage(
        "transportExpenses",
        DEFAULT_TRANSPORT_EXPENSES
    );

let editingExpenseIndex = -1;
let deletingExpenseIndex = -1;


/* ---------- Open Expense Modal ---------- */

function openExpenseModal() {

    editingExpenseIndex = -1;

    document.getElementById(
        "expenseModalTitle"
    ).textContent =
        "Add Expense";

    document.getElementById(
        "expenseDate"
    ).value =
        getTodayISO();

    document.getElementById(
        "expenseTransport"
    ).value =
        transportDetails.mode || "Scooty";

    document.getElementById(
        "expenseRoute"
    ).value =
        transportDetails.from &&
        transportDetails.to
            ? `${transportDetails.from} → ${transportDetails.to}`
            : "";

    document.getElementById(
        "expenseAmount"
    ).value = "";

    document
        .getElementById("expenseModal")
        .classList.add("show");
}


/* ---------- Close Expense Modal ---------- */

function closeExpenseModal() {

    document
        .getElementById("expenseModal")
        .classList.remove("show");
}


/* ---------- Save Expense ---------- */

function saveExpense() {

    const date =
        document.getElementById(
            "expenseDate"
        ).value;

    const transport =
        document.getElementById(
            "expenseTransport"
        ).value;

    const route =
        document.getElementById(
            "expenseRoute"
        ).value.trim();

    const amount =
        Number(
            document.getElementById(
                "expenseAmount"
            ).value
        );

    if (!date) {

        alert(
            "Please select the date."
        );

        return;
    }

    if (!transport) {

        alert(
            "Please select transport type."
        );

        return;
    }

    if (!route) {

        alert(
            "Please enter the route."
        );

        return;
    }

    if (
        isNaN(amount) ||
        amount <= 0
    ) {

        alert(
            "Please enter a valid expense amount."
        );

        return;
    }

    const expense = {

        id:
            editingExpenseIndex !== -1
                ? transportExpenses[
                    editingExpenseIndex
                ].id
                : Date.now(),

        date,
        transport,
        route,
        amount
    };

    if (
        editingExpenseIndex !== -1
    ) {

        transportExpenses[
            editingExpenseIndex
        ] = expense;

    } else {

        transportExpenses.push(
            expense
        );
    }

    transportExpenses.sort(
        (a, b) =>
            new Date(b.date) -
            new Date(a.date)
    );

    saveToStorage(
        "transportExpenses",
        transportExpenses
    );

    updateExpenseUI();
    closeExpenseModal();
}


/* =========================================================
   UPDATE EXPENSE UI
   ========================================================= */

function updateExpenseUI() {

    displayExpenses();
    updateExpenseSummary();
    updateDashboardExpense();
}


/* =========================================================
   DISPLAY EXPENSES
   ========================================================= */

function displayExpenses() {

    const body =
        document.getElementById(
            "expenseTableBody"
        );

    const empty =
        document.getElementById(
            "expenseEmptyState"
        );

    if (!body) {
        return;
    }

    body.innerHTML = "";

    if (!transportExpenses.length) {

        if (empty) {
            empty.style.display =
                "block";
        }

        const count =
            document.getElementById(
                "expenseCount"
            );

        if (count) {
            count.textContent =
                "0 Days";
        }

        return;
    }

    if (empty) {
        empty.style.display =
            "none";
    }

    transportExpenses.forEach(
        (expense, index) => {

            const row =
                document.createElement(
                    "tr"
                );

            row.innerHTML = `
                <td>
                    ${formatDate(expense.date)}
                </td>

                <td>

                    <span class="transport-table-type">

                        ${getTransportIcon(
                            expense.transport
                        )}

                        ${expense.transport}

                    </span>

                </td>

                <td>
                    ${expense.route}
                </td>

                <td>

                    <strong>
                        ${formatMoney(
                            expense.amount
                        )}
                    </strong>

                </td>

                <td>

                    <div class="table-actions">

                        <button
                            class="table-edit-btn"
                            onclick="editExpense(${index})">
                            ✏️
                        </button>

                        <button
                            class="table-delete-btn"
                            onclick="deleteExpense(${index})">
                            🗑️
                        </button>

                    </div>

                </td>
            `;

            body.appendChild(row);
        }
    );

    const count =
        document.getElementById(
            "expenseCount"
        );

    if (count) {

        count.textContent =
            transportExpenses.length +
            (
                transportExpenses.length === 1
                    ? " Day"
                    : " Days"
            );
    }
}


/* =========================================================
   TODAY EXPENSE
   ========================================================= */

function getTodayExpense() {

    const today =
        getTodayISO();

    return transportExpenses
        .filter(
            expense =>
                expense.date === today
        )
        .reduce(
            (sum, expense) =>
                sum +
                Number(
                    expense.amount || 0
                ),
            0
        );
}


/* =========================================================
   10-DAY EXPENSE
   ========================================================= */

function getLastTenUniqueDates() {

    const sorted =
        [...transportExpenses].sort(
            (a, b) =>
                new Date(b.date) -
                new Date(a.date)
        );

    const dates = [];

    sorted.forEach(expense => {

        if (
            !dates.includes(
                expense.date
            ) &&
            dates.length < 10
        ) {

            dates.push(
                expense.date
            );
        }
    });

    return dates;
}


function getTenDayExpenses() {

    const dates =
        getLastTenUniqueDates();

    return transportExpenses.filter(
        expense =>
            dates.includes(
                expense.date
            )
    );
}


function getTenDayTotalExpense() {

    return getTenDayExpenses()
        .reduce(
            (sum, expense) =>
                sum +
                Number(
                    expense.amount || 0
                ),
            0
        );
}


/* =========================================================
   EXPENSE SUMMARY
   ---------------------------------------------------------
   10-Day Budget = ₹50 × 10 = ₹500
   ========================================================= */

function updateExpenseSummary() {

    const total =
        getTenDayTotalExpense();

    const tenDayExpenses =
        getTenDayExpenses();

    const average =
        tenDayExpenses.length
            ? total /
              tenDayExpenses.length
            : 0;

    /* ₹50 per day × 10 days */

    const budget =
        DEFAULT_DAILY_BUDGET * 10;

    const difference =
        budget - total;

    const savings =
        Math.max(
            difference,
            0
        );

    const totalEl =
        document.getElementById(
            "tenDayTotal"
        );

    if (totalEl) {

        totalEl.textContent =
            formatMoney(total);
    }

    const averageEl =
        document.getElementById(
            "averageExpense"
        );

    if (averageEl) {

        averageEl.textContent =
            formatMoney(average);
    }

    const savingsEl =
        document.getElementById(
            "expenseSavings"
        );

    if (savingsEl) {

        savingsEl.textContent =
            formatMoney(savings);
    }

    const totalTransport =
        document.getElementById(
            "totalTransportExpense"
        );

    if (totalTransport) {

        totalTransport.textContent =
            formatMoney(total);
    }

   
}


/* =========================================================
   DASHBOARD EXPENSE
   ---------------------------------------------------------
   Daily Budget = ₹50
   10-Day Budget = ₹500
   ========================================================= */

function updateDashboardExpense() {

    const total =
        getTenDayTotalExpense();

    const budget =
        DEFAULT_DAILY_BUDGET * 10;

    const savings =
        budget - total;

    const percentage =
        Math.min(
            (total / budget) * 100,
            100
        );

    const dashTenDayExpense =
        document.getElementById(
            "dashTenDayExpense"
        );

    if (dashTenDayExpense) {

        dashTenDayExpense.textContent =
            formatMoney(total);
    }

    const dashTenDayBudget =
        document.getElementById(
            "dashTenDayBudget"
        );

    if (dashTenDayBudget) {

        dashTenDayBudget.textContent =
            formatMoney(budget);
    }

    const dashTenDayTotal =
        document.getElementById(
            "dashTenDayTotal"
        );

    if (dashTenDayTotal) {

        dashTenDayTotal.textContent =
            formatMoney(total);
    }

    const dashTenDaySavings =
        document.getElementById(
            "dashTenDaySavings"
        );

    if (dashTenDaySavings) {

        dashTenDaySavings.textContent =
            formatMoney(
                Math.max(
                    savings,
                    0
                )
            );
    }

    const circle =
        document.getElementById(
            "dashExpenseCircle"
        );

    if (circle) {

        const degrees =
            percentage * 3.6;

        circle.style.background =
            `conic-gradient(
                #6c4ce4 0deg ${degrees}deg,
                #eeeaf4 ${degrees}deg 360deg
            )`;
    }

    /* Today's expense */

    const today =
        getTodayExpense();

    const dashTodaySpent =
        document.getElementById(
            "dashTodaySpent"
        );

    if (dashTodaySpent) {

        dashTodaySpent.textContent =
            `${formatMoney(today)} spent today`;
    }
}


/* =========================================================
   EDIT EXPENSE
   ========================================================= */

function editExpense(index) {

    editingExpenseIndex =
        index;

    const expense =
        transportExpenses[index];

    document.getElementById(
        "expenseModalTitle"
    ).textContent =
        "Edit Expense";

    document.getElementById(
        "expenseDate"
    ).value =
        expense.date;

    document.getElementById(
        "expenseTransport"
    ).value =
        expense.transport;

    document.getElementById(
        "expenseRoute"
    ).value =
        expense.route;

    document.getElementById(
        "expenseAmount"
    ).value =
        expense.amount;

    document
        .getElementById("expenseModal")
        .classList.add("show");
}


/* =========================================================
   DELETE EXPENSE
   ========================================================= */

function deleteExpense(index) {

    deletingExpenseIndex =
        index;

    const expense =
        transportExpenses[index];

    document.getElementById(
        "deleteExpenseName"
    ).textContent =
        `${formatDate(
            expense.date
        )} - ${formatMoney(
            expense.amount
        )}`;

    document
        .getElementById(
            "expenseDeleteModal"
        )
        .classList.add("show");
}


/* ---------- Close Expense Delete Modal ---------- */

function closeExpenseDeleteModal() {

    document
        .getElementById(
            "expenseDeleteModal"
        )
        .classList.remove("show");

    deletingExpenseIndex = -1;
}


/* ---------- Confirm Delete Expense ---------- */

function confirmDeleteExpense() {

    if (
        deletingExpenseIndex !== -1
    ) {

        transportExpenses.splice(
            deletingExpenseIndex,
            1
        );

        saveToStorage(
            "transportExpenses",
            transportExpenses
        );

        updateExpenseUI();
        closeExpenseDeleteModal();
    }
}


/* =========================================================
   INITIAL LOAD
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        updateProfileUI();

        displaySkills();

        updateAcademicUI();

        updateTransportUI();

        updateExpenseUI();

        updateDashboardAcademic();

        updateDashboardExpense();
    }
);
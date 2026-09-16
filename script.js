/* =========================================================
   STUDENT LIFE TRACKER - script2.js
   ========================================================= */


/* =========================================================
   COMMON FUNCTIONS
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

function formatMoney(amount) {
    return "₹" + Number(amount || 0).toLocaleString("en-IN");
}

function getTodayISO() {
    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

function formatDate(dateString) {
    if (!dateString) {
        return "—";
    }

    const date = new Date(dateString + "T00:00:00");

    if (isNaN(date.getTime())) {
        return dateString;
    }

    return date.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    });
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

function formatChange(change) {
    const value = Number(change).toFixed(2);

    if (change > 0) {
        return "+" + value + "%";
    }

    return value + "%";
}


/* =========================================================
   DAILY BUDGET
   ========================================================= */

let dailyBudget = getFromStorage(
    "dailyBudget",
    50
);

dailyBudget = Number(dailyBudget) || 50;


/* Save daily budget if budget editing is used */
function saveDailyBudget(value) {
    const amount = Number(value);

    if (isNaN(amount) || amount <= 0) {
        alert("Please enter a valid daily budget.");
        return false;
    }

    dailyBudget = amount;

    saveToStorage(
        "dailyBudget",
        dailyBudget
    );

    updateExpenseUI();
    updateDashboardExpense();

    return true;
}


/* =========================================================
   PAGE NAVIGATION
   ========================================================= */

function showPage(pageId, clickedButton) {

    document.querySelectorAll(".page").forEach(page => {
        page.classList.remove("active");
    });

    const page = document.getElementById(pageId);

    if (page) {
        page.classList.add("active");
    }

    document.querySelectorAll(".nav-item").forEach(item => {
        item.classList.remove("active");
    });

    if (clickedButton) {
        clickedButton.classList.add("active");
    } else {
        document.querySelectorAll(".nav-item").forEach(item => {

            const onclickText =
                item.getAttribute("onclick") || "";

            if (
                onclickText.includes(
                    `showPage('${pageId}'`
                )
            ) {
                item.classList.add("active");
            }
        });
    }

    const headings = {
        home: "Dashboard",
        profile: "My Profile",
        academic: "Academic Performance",
        transport: "Transport & Expenses"
    };

    const pageHeading =
        document.getElementById("pageHeading");

    if (pageHeading) {
        pageHeading.textContent =
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

/*
   Use studentProfile as the main storage key.

   The fallback to profileData helps if old data was
   saved using the previous key.
*/

let profileData = getFromStorage(
    "studentProfile",
    getFromStorage(
        "profileData",
        {
            name: "",
            role: "",
            register: "",
            department: "",
            college: "",
            email: "",
            phone: "",
            year: "",
            about: ""
        }
    )
);


/* OPEN PROFILE MODAL */

function openProfileModal() {

    const fields = {
        editName: profileData.name,
        editRole: profileData.role,
        editRegister: profileData.register,
        editDepartment: profileData.department,
        editCollege: profileData.college,
        editEmail: profileData.email,
        editPhone: profileData.phone,
        editYear: profileData.year,
        editAbout: profileData.about
    };

    Object.keys(fields).forEach(id => {

        const element =
            document.getElementById(id);

        if (element) {
            element.value =
                fields[id] || "";
        }
    });

    const modal =
        document.getElementById("profileModal");

    if (modal) {
        modal.classList.add("show");
    }
}


/* CLOSE PROFILE */

function closeProfileModal() {

    const modal =
        document.getElementById("profileModal");

    if (modal) {
        modal.classList.remove("show");
    }
}


/* SAVE PROFILE */

function saveProfile() {

    const getValue = id => {

        const element =
            document.getElementById(id);

        return element
            ? element.value.trim()
            : "";
    };

    const name = getValue("editName");
    const role = getValue("editRole");
    const register = getValue("editRegister");
    const department = getValue("editDepartment");
    const college = getValue("editCollege");
    const email = getValue("editEmail");
    const phone = getValue("editPhone");
    const year = getValue("editYear");
    const about = getValue("editAbout");


    /* NAME VALIDATION */

    if (name === "") {

        alert("Please enter your name.");

        const element =
            document.getElementById("editName");

        if (element) {
            element.focus();
        }

        return;
    }


    /* EMAIL VALIDATION */

    if (email === "") {

        alert("Please enter your email address.");

        const element =
            document.getElementById("editEmail");

        if (element) {
            element.focus();
        }

        return;
    }

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    if (!emailPattern.test(email)) {

        alert("Please enter a valid email address.");

        const element =
            document.getElementById("editEmail");

        if (element) {
            element.focus();
        }

        return;
    }


    /* PHONE VALIDATION */

    if (phone === "") {

        alert("Please enter your phone number.");

        const element =
            document.getElementById("editPhone");

        if (element) {
            element.focus();
        }

        return;
    }

    const phonePattern =
        /^[6-9][0-9]{9}$/;

    if (!phonePattern.test(phone)) {

        alert(
            "Please enter a valid 10-digit phone number."
        );

        const element =
            document.getElementById("editPhone");

        if (element) {
            element.focus();
        }

        return;
    }


    /* SAVE PROFILE */

    profileData = {
        name: name,
        role: role,
        register: register,
        department: department,
        college: college,
        email: email,
        phone: phone,
        year: year,
        about: about
    };

    saveToStorage(
        "studentProfile",
        profileData
    );

    /* Keep old key updated too for compatibility */
    saveToStorage(
        "profileData",
        profileData
    );

    updateProfileUI();
    closeProfileModal();
}


/* UPDATE PROFILE UI */

function updateProfileUI() {

    const name =
        profileData.name || "Student";

    const role =
        profileData.role || "Student";


    const profileName =
        document.getElementById("profileName");

    if (profileName) {
        profileName.textContent = name;
    }


    const profileRole =
        document.getElementById("profileRole");

    if (profileRole) {
        profileRole.textContent = role;
    }


    const setText = (id, value, fallback = "Not added") => {

        const element =
            document.getElementById(id);

        if (element) {
            element.textContent =
                value || fallback;
        }
    };


    setText(
        "profileRegister",
        profileData.register
    );

    setText(
        "profileDepartment",
        profileData.department
    );

    setText(
        "profileCollege",
        profileData.college
    );

    setText(
        "profileEmail",
        profileData.email
    );

    setText(
        "profilePhone",
        profileData.phone
    );

    setText(
        "profileYear",
        profileData.year
    );

    setText(
        "profileAbout",
        profileData.about,
        "Add a short introduction about yourself."
    );


    /* PROFILE AVATAR */

    const firstLetter =
        name.charAt(0).toUpperCase() || "S";


    const avatarIds = [
        "profileAvatar",
        "sideAvatar",
        "headerAvatar"
    ];

    avatarIds.forEach(id => {

        const element =
            document.getElementById(id);

        if (element) {
            element.textContent =
                firstLetter;
        }
    });


    const sideName =
        document.getElementById("sideName");

    if (sideName) {
        sideName.textContent = name;
    }


    const headerName =
        document.getElementById("headerName");

    if (headerName) {
        headerName.textContent = name;
    }


    const welcomeName =
        document.getElementById("welcomeName");

    if (welcomeName) {
        welcomeName.textContent =
            `Hi, ${name}!`;
    }


    updateProfileCompletion();
}


/* PROFILE COMPLETION */

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
        fields.filter(value =>
            String(value || "").trim() !== ""
        ).length;

    const percentage =
        Math.round(
            (completed / fields.length) * 100
        );


    const valueElement =
        document.getElementById(
            "profileCompletionValue"
        );

    if (valueElement) {
        valueElement.textContent =
            percentage + "%";
    }


    const barElement =
        document.getElementById(
            "profileCompletionBar"
        );

    if (barElement) {
        barElement.style.width =
            percentage + "%";
    }


    let message =
        "Start by adding your profile details.";

    if (percentage === 100) {

        message =
            "Excellent! Your profile is complete.";

    } else if (percentage >= 75) {

        message =
            "Almost complete! Add the remaining details.";

    } else if (percentage >= 50) {

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
    "studentSkills",
    getFromStorage("skills", [])
);

let editingSkillIndex = -1;
let deletingSkillIndex = -1;


/* DISPLAY SKILLS */

function displaySkills() {

    const container =
        document.getElementById(
            "skillsContainer"
        );

    if (!container) {
        return;
    }

    container.innerHTML = "";


    if (skills.length === 0) {

        container.innerHTML = `
            <div class="skills-empty">
                <div>💡</div>
                <p>No skills added yet.</p>
            </div>
        `;

        return;
    }


    skills.forEach((skill, index) => {

        const item =
            document.createElement("div");

        item.className =
            "skill-item";

        item.innerHTML = `
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

        container.appendChild(item);
    });
}


/* OPEN SKILL MODAL */

function openSkillModal() {

    editingSkillIndex = -1;

    const title =
        document.getElementById(
            "skillModalTitle"
        );

    if (title) {
        title.textContent =
            "Add Skill";
    }


    const input =
        document.getElementById(
            "skillInput"
        );

    if (input) {
        input.value = "";
    }


    const modal =
        document.getElementById(
            "skillModal"
        );

    if (modal) {
        modal.classList.add("show");
    }
}


/* CLOSE SKILL MODAL */

function closeSkillModal() {

    const modal =
        document.getElementById(
            "skillModal"
        );

    if (modal) {
        modal.classList.remove("show");
    }
}


/* SAVE SKILL */

function saveSkill() {

    const input =
        document.getElementById(
            "skillInput"
        );

    if (!input) {
        return;
    }

    const skill =
        input.value.trim();


    if (skill === "") {

        alert("Please enter a skill.");

        input.focus();

        return;
    }


    if (editingSkillIndex === -1) {

        skills.push(skill);

    } else {

        skills[editingSkillIndex] =
            skill;
    }


    saveToStorage(
        "studentSkills",
        skills
    );

    saveToStorage(
        "skills",
        skills
    );

    displaySkills();

    closeSkillModal();
}


/* EDIT SKILL */

function editSkill(index) {

    if (
        index < 0 ||
        index >= skills.length
    ) {
        return;
    }

    editingSkillIndex = index;


    const title =
        document.getElementById(
            "skillModalTitle"
        );

    if (title) {
        title.textContent =
            "Edit Skill";
    }


    const input =
        document.getElementById(
            "skillInput"
        );

    if (input) {
        input.value =
            skills[index];
    }


    const modal =
        document.getElementById(
            "skillModal"
        );

    if (modal) {
        modal.classList.add("show");
    }
}


/* DELETE SKILL */

function deleteSkill(index) {

    if (
        index < 0 ||
        index >= skills.length
    ) {
        return;
    }

    deletingSkillIndex = index;


    const nameElement =
        document.getElementById(
            "deleteSkillName"
        );

    if (nameElement) {

        nameElement.textContent =
            `"${skills[index]}"`;
    }


    const modal =
        document.getElementById(
            "deleteModal"
        );

    if (modal) {
        modal.classList.add("show");
    }
}


/* CLOSE DELETE SKILL MODAL */

function closeDeleteModal() {

    const modal =
        document.getElementById(
            "deleteModal"
        );

    if (modal) {
        modal.classList.remove("show");
    }

    deletingSkillIndex = -1;
}


/* CONFIRM DELETE SKILL */

function confirmDeleteSkill() {

    if (deletingSkillIndex === -1) {
        return;
    }

    skills.splice(
        deletingSkillIndex,
        1
    );


    saveToStorage(
        "studentSkills",
        skills
    );

    saveToStorage(
        "skills",
        skills
    );


    displaySkills();

    closeDeleteModal();
}


/* =========================================================
   ACADEMIC
   ========================================================= */

let academicMarks = getFromStorage(
    "academicMarks",
    {
        sem1: null,
        sem2: null,
        sem3: null,
        sem4: null
    }
);


/* OPEN ACADEMIC MODAL */

function openAcademicModal() {

    const values = [
        academicMarks.sem1,
        academicMarks.sem2,
        academicMarks.sem3,
        academicMarks.sem4
    ];

    const ids = [
        "sem1Input",
        "sem2Input",
        "sem3Input",
        "sem4Input"
    ];


    ids.forEach((id, index) => {

        const input =
            document.getElementById(id);

        if (input) {

            input.value =
                values[index] !== null &&
                values[index] !== undefined
                    ? values[index]
                    : "";
        }
    });


    const modal =
        document.getElementById(
            "academicModal"
        );

    if (modal) {
        modal.classList.add("show");
    }
}


/* CLOSE ACADEMIC MODAL */

function closeAcademicModal() {

    const modal =
        document.getElementById(
            "academicModal"
        );

    if (modal) {
        modal.classList.remove("show");
    }
}


/* SAVE ACADEMIC */

function saveAcademicMarks() {

    const inputs = [
        "sem1Input",
        "sem2Input",
        "sem3Input",
        "sem4Input"
    ];


    const values =
        inputs.map(id => {

            const input =
                document.getElementById(id);

            if (!input) {
                return null;
            }

            const value =
                input.value.trim();

            if (value === "") {
                return null;
            }

            return Number(value);
        });


    const invalid =
        values.some(value =>
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


/* CREATE SEMESTER DATA */

function getSemesterData() {

    return [
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
}


/* UPDATE ACADEMIC */

function updateAcademicUI() {

    const semesters =
        getSemesterData();


    const list =
        document.getElementById(
            "semesterList"
        );

    if (!list) {
        return;
    }

    list.innerHTML = "";


    semesters.forEach((sem, index) => {

        const row =
            document.createElement("div");

        /*
           Using classes that work with the
           existing academic card structure.
        */

        row.className =
            "semester-item";


        const hasValue =
            sem.value !== null &&
            sem.value !== undefined &&
            !isNaN(sem.value);


        const value =
            hasValue
                ? Number(sem.value) + "%"
                : "Not added";


        const progress =
            hasValue
                ? Number(sem.value)
                : 0;


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
    });


    updateAcademicSummary(semesters);

    updateAcademicImprovement(semesters);

    updateAcademicCombination(semesters);

    updateDashboardAcademic();
}


/* =========================================================
   ACADEMIC SUMMARY
   ========================================================= */

function updateAcademicSummary(semesters) {

    const valid =
        semesters.filter(sem =>
            sem.value !== null &&
            sem.value !== undefined &&
            !isNaN(sem.value)
        );


    const overall =
        document.getElementById(
            "overallAverage"
        );

    const best =
        document.getElementById(
            "bestSemester"
        );

    const highest =
        document.getElementById(
            "highestPercentage"
        );

    const latest =
        document.getElementById(
            "latestChange"
        );


    if (valid.length === 0) {

        if (overall) overall.textContent = "—";
        if (best) best.textContent = "—";
        if (highest) highest.textContent = "—";
        if (latest) latest.textContent = "—";

        return;
    }


    /* OVERALL AVERAGE */

    const total =
        valid.reduce(
            (sum, sem) =>
                sum + Number(sem.value),
            0
        );


    const average =
        total / valid.length;


    if (overall) {

        overall.textContent =
            average.toFixed(2) + "%";
    }


    /* HIGHEST PERCENTAGE */

    const highestValue =
        Math.max(
            ...valid.map(
                sem => Number(sem.value)
            )
        );


    if (highest) {

        highest.textContent =
            highestValue + "%";
    }


    /* BEST SEMESTER */

    const bestSem =
        valid.find(
            sem =>
                Number(sem.value) ===
                highestValue
        );


    if (best && bestSem) {

        best.textContent =
            bestSem.short;
    }


    /* LATEST ADJACENT CHANGE */

    let latestChange = null;


    for (let i = 1; i < semesters.length; i++) {

        const previous =
            semesters[i - 1].value;

        const current =
            semesters[i].value;


        if (
            previous !== null &&
            previous !== undefined &&
            current !== null &&
            current !== undefined &&
            !isNaN(previous) &&
            !isNaN(current)
        ) {

            latestChange =
                Number(current) -
                Number(previous);
        }
    }


    if (latest) {

        latest.textContent =
            latestChange === null
                ? "—"
                : formatChange(latestChange);
    }
}


/* =========================================================
   PERFORMANCE IMPROVEMENT
   ========================================================= */

function updateAcademicImprovement(semesters) {

    const container =
        document.getElementById(
            "improvementList"
        );

    const insight =
        document.getElementById(
            "academicInsight"
        );


    if (!container || !insight) {
        return;
    }


    container.innerHTML = "";


    /*
       IMPORTANT:

       Compare ONLY adjacent semesters.

       Sem 1 → Sem 2
       Sem 2 → Sem 3
       Sem 3 → Sem 4
    */

    let comparisonCount = 0;

    let firstRecordedIndex = -1;
    let lastRecordedIndex = -1;


    semesters.forEach((sem, index) => {

        if (
            sem.value !== null &&
            sem.value !== undefined &&
            !isNaN(sem.value)
        ) {

            if (firstRecordedIndex === -1) {
                firstRecordedIndex = index;
            }

            lastRecordedIndex = index;
        }
    });


    for (let i = 1; i < semesters.length; i++) {

        const previous =
            semesters[i - 1];

        const current =
            semesters[i];


        const hasPrevious =
            previous.value !== null &&
            previous.value !== undefined &&
            !isNaN(previous.value);


        const hasCurrent =
            current.value !== null &&
            current.value !== undefined &&
            !isNaN(current.value);


        if (!hasPrevious || !hasCurrent) {
            continue;
        }


        comparisonCount++;


        const change =
            Number(current.value) -
            Number(previous.value);


        let className =
            "change-neutral";

        let arrow =
            "→";


        if (change > 0) {

            className =
                "change-positive";

            arrow =
                "↑";

        } else if (change < 0) {

            className =
                "change-negative";

            arrow =
                "↓";
        }


        const item =
            document.createElement("div");

        item.className =
            "improvement-item " +
            className;


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


        container.appendChild(item);
    }


    /*
       If no adjacent pair is available,
       show a helpful message.
    */

    if (comparisonCount === 0) {

        container.innerHTML = `
            <div class="improvement-empty">
                <div>📈</div>

                <p>
                    Add two adjacent semester
                    marks to see performance improvement.
                </p>
            </div>
        `;

        insight.textContent =
            "Add marks for consecutive semesters to see performance insights.";

        return;
    }


    /*
       Overall insight uses the first and last
       recorded semester values.
    */

    const firstValue =
        semesters[firstRecordedIndex].value;

    const lastValue =
        semesters[lastRecordedIndex].value;


    const totalChange =
        Number(lastValue) -
        Number(firstValue);


    if (totalChange > 0) {

        insight.textContent =
            `Great! Your performance has improved by ${totalChange.toFixed(2)}% from ${semesters[firstRecordedIndex].short} to ${semesters[lastRecordedIndex].short}.`;

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

function updateAcademicCombination(semesters) {

    const grid =
        document.getElementById(
            "combinationGrid"
        );


    if (!grid) {
        return;
    }


    grid.innerHTML = "";


    const combinations = [

        [0, 1, "Sem 1 + Sem 2"],

        [1, 2, "Sem 2 + Sem 3"],

        [2, 3, "Sem 3 + Sem 4"]

    ];


    combinations.forEach(
        ([first, second, title]) => {

            const value1 =
                semesters[first].value;

            const value2 =
                semesters[second].value;


            let result =
                "—";


            if (
                value1 !== null &&
                value1 !== undefined &&
                value2 !== null &&
                value2 !== undefined &&
                !isNaN(value1) &&
                !isNaN(value2)
            ) {

                result =
                    (
                        (
                            Number(value1) +
                            Number(value2)
                        ) / 2
                    ).toFixed(2) + "%";
            }


            const box =
                document.createElement("div");

            box.className =
                "combination-box";


            box.innerHTML = `
                <span>
                    ${title}
                </span>

                <strong>
                    ${result}
                </strong>

                <small>
                    Combined Average
                </small>
            `;


            grid.appendChild(box);
        }
    );


    /*
       Overall average of all entered semesters.
       Missing semesters are ignored.
    */

    const valid =
        semesters.filter(
            semester =>
                semester.value !== null &&
                semester.value !== undefined &&
                !isNaN(semester.value)
        );


    let overall =
        "—";


    if (valid.length > 0) {

        const total =
            valid.reduce(
                (sum, semester) =>
                    sum + Number(semester.value),
                0
            );


        overall =
            (
                total / valid.length
            ).toFixed(2) + "%";
    }


    const overallBox =
        document.createElement("div");


    overallBox.className =
        "combination-box highlight";


    overallBox.innerHTML = `
        <span>
            Sem 1 - Sem 4
        </span>

        <strong>
            ${overall}
        </strong>

        <small>
            Overall Average
        </small>
    `;


    grid.appendChild(overallBox);
}


/* =========================================================
   DASHBOARD ACADEMIC
   ========================================================= */

function updateDashboardAcademic() {

    const dashAcademic =
        document.getElementById(
            "dashAcademic"
        );

    const dashAcademicNote =
        document.getElementById(
            "dashAcademicNote"
        );

    const container =
        document.getElementById(
            "dashboardAcademicList"
        );


    if (!dashAcademic) {
        return;
    }


    const values = [
        academicMarks.sem1,
        academicMarks.sem2,
        academicMarks.sem3,
        academicMarks.sem4
    ];


    const valid =
        values.filter(value =>
            value !== null &&
            value !== undefined &&
            !isNaN(value)
        );


    if (valid.length === 0) {

        dashAcademic.textContent =
            "—";

        if (dashAcademicNote) {

            dashAcademicNote.textContent =
                "Add your marks";
        }

    } else {

        const total =
            valid.reduce(
                (sum, value) =>
                    sum + Number(value),
                0
            );


        const average =
            total / valid.length;


        dashAcademic.textContent =
            average.toFixed(2) + "%";


        if (dashAcademicNote) {

            dashAcademicNote.textContent =
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


    if (valid.length === 0) {

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


    values.forEach((value, index) => {

        const item =
            document.createElement("div");

        item.className =
            "dash-semester";


        const hasValue =
            value !== null &&
            value !== undefined &&
            !isNaN(value);


        const progress =
            hasValue
                ? Number(value)
                : 0;


        item.innerHTML = `
            <div>

                <span>
                    Sem ${index + 1}
                </span>

                <div class="dash-progress">

                    <div
                        style="width:${progress}%">
                    </div>

                </div>

            </div>

            <strong>
                ${
                    hasValue
                        ? value + "%"
                        : "—"
                }
            </strong>
        `;


        container.appendChild(item);
    });
}


/* =========================================================
   TRANSPORT
   ========================================================= */

let transportDetails =
    getFromStorage(
        "transportDetails",
        {
            mode: "",
            from: "",
            to: "",
            vehicle: "",
            time: "",
            distance: ""
        }
    );


/* OPEN TRANSPORT MODAL */

function openTransportModal() {

    const title =
        document.getElementById(
            "transportModalTitle"
        );

    if (title) {

        title.textContent =
            transportDetails.mode
                ? "Edit Transport"
                : "Add Transport";
    }


    const fields = {

        transportModeInput:
            transportDetails.mode,

        fromInput:
            transportDetails.from,

        toInput:
            transportDetails.to,

        vehicleInput:
            transportDetails.vehicle,

        timeInput:
            transportDetails.time,

        distanceInput:
            transportDetails.distance
    };


    Object.keys(fields).forEach(id => {

        const input =
            document.getElementById(id);

        if (input) {

            input.value =
                fields[id] || "";
        }
    });


    const modal =
        document.getElementById(
            "transportModal"
        );

    if (modal) {

        modal.classList.add("show");
    }
}


/* CLOSE TRANSPORT MODAL */

function closeTransportModal() {

    const modal =
        document.getElementById(
            "transportModal"
        );

    if (modal) {

        modal.classList.remove("show");
    }
}


/* SAVE TRANSPORT */

function saveTransport() {

    const modeElement =
        document.getElementById(
            "transportModeInput"
        );

    const mode =
        modeElement
            ? modeElement.value
            : "";


    const getValue = id => {

        const element =
            document.getElementById(id);

        return element
            ? element.value.trim()
            : "";
    };


    const from =
        getValue("fromInput");

    const to =
        getValue("toInput");

    const vehicle =
        getValue("vehicleInput");

    const time =
        getValue("timeInput");

    const distance =
        getValue("distanceInput");


    if (mode === "") {

        alert(
            "Please select transport mode."
        );

        return;
    }


    if (from === "" || to === "") {

        alert(
            "Please enter From and To locations."
        );

        return;
    }


    if (vehicle === "") {

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


/* UPDATE TRANSPORT UI */

function updateTransportUI() {

    const hasTransport =
        transportDetails.mode &&
        transportDetails.from &&
        transportDetails.to;


    const emptyState =
        document.getElementById(
            "transportEmptyState"
        );

    const detailsView =
        document.getElementById(
            "transportDetailsView"
        );


    if (!emptyState || !detailsView) {
        return;
    }


    if (!hasTransport) {

        emptyState.classList.remove(
            "hidden"
        );

        detailsView.classList.add(
            "hidden"
        );


        const setText = (id, text) => {

            const element =
                document.getElementById(id);

            if (element) {
                element.textContent =
                    text;
            }
        };


        setText(
            "transportMode",
            "Not added"
        );

        setText(
            "transportRoute",
            "Not added"
        );

        setText(
            "dashTransportMode",
            "Not added"
        );

        setText(
            "dashTransportRoute",
            "Add transport details"
        );


        return;
    }


    emptyState.classList.add(
        "hidden"
    );

    detailsView.classList.remove(
        "hidden"
    );


    const icon =
        getTransportIcon(
            transportDetails.mode
        );


    const setText = (id, text) => {

        const element =
            document.getElementById(id);

        if (element) {
            element.textContent =
                text;
        }
    };


    setText(
        "transportModeIcon",
        icon
    );

    setText(
        "dashTransportIcon",
        icon
    );

    setText(
        "transportMode",
        transportDetails.mode
    );

    setText(
        "transportRoute",
        `${transportDetails.from} → ${transportDetails.to}`
    );

    setText(
        "dashTransportMode",
        transportDetails.mode
    );

    setText(
        "dashTransportRoute",
        `${transportDetails.from} → ${transportDetails.to}`
    );

    setText(
        "fromLocation",
        transportDetails.from
    );

    setText(
        "toLocation",
        transportDetails.to
    );

    setText(
        "transportType",
        transportDetails.mode
    );

    setText(
        "vehicleName",
        transportDetails.vehicle || "—"
    );

    setText(
        "travelTime",
        transportDetails.time || "—"
    );

    setText(
        "travelDistance",
        transportDetails.distance || "—"
    );


    /* DASHBOARD TRANSPORT */

    const dashboard =
        document.getElementById(
            "dashboardTransportContent"
        );


    if (dashboard) {

        dashboard.className =
            "dashboard-transport-main";


        dashboard.innerHTML = `
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
   EXPENSE
   ========================================================= */

let transportExpenses =
    getFromStorage(
        "transportExpenses",
        []
    );


let editingExpenseIndex = -1;
let deletingExpenseIndex = -1;


/* OPEN EXPENSE */

function openExpenseModal() {

    editingExpenseIndex = -1;


    const title =
        document.getElementById(
            "expenseModalTitle"
        );

    if (title) {

        title.textContent =
            "Add Expense";
    }


    const date =
        document.getElementById(
            "expenseDate"
        );

    if (date) {

        date.value =
            getTodayISO();
    }


    const transport =
        document.getElementById(
            "expenseTransport"
        );

    if (transport) {

        transport.value =
            transportDetails.mode || "";
    }


    const route =
        document.getElementById(
            "expenseRoute"
        );

    if (route) {

        route.value =
            transportDetails.from &&
            transportDetails.to

                ? `${transportDetails.from} → ${transportDetails.to}`

                : "";
    }


    const amount =
        document.getElementById(
            "expenseAmount"
        );

    if (amount) {

        amount.value = "";
    }


    const modal =
        document.getElementById(
            "expenseModal"
        );

    if (modal) {

        modal.classList.add("show");
    }
}


/* CLOSE EXPENSE */

function closeExpenseModal() {

    const modal =
        document.getElementById(
            "expenseModal"
        );

    if (modal) {

        modal.classList.remove("show");
    }
}


/* SAVE EXPENSE */

function saveExpense() {

    const dateElement =
        document.getElementById(
            "expenseDate"
        );

    const transportElement =
        document.getElementById(
            "expenseTransport"
        );

    const routeElement =
        document.getElementById(
            "expenseRoute"
        );

    const amountElement =
        document.getElementById(
            "expenseAmount"
        );


    const date =
        dateElement
            ? dateElement.value
            : "";


    const transport =
        transportElement
            ? transportElement.value
            : "";


    const route =
        routeElement
            ? routeElement.value.trim()
            : "";


    const amount =
        amountElement
            ? Number(amountElement.value)
            : NaN;


    if (date === "") {

        alert(
            "Please select the date."
        );

        return;
    }


    if (transport === "") {

        alert(
            "Please select transport type."
        );

        return;
    }


    if (route === "") {

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

        date,
        transport,
        route,
        amount
    };


    if (editingExpenseIndex !== -1) {

        transportExpenses[
            editingExpenseIndex
        ] = expense;

    } else {

        transportExpenses.push(
            expense
        );
    }


    /* Keep newest dates first */

    transportExpenses.sort(
        (a, b) =>
            new Date(b.date) -
            new Date(a.date)
    );


    /*
       IMPORTANT:
       Old expenses are NOT deleted.
       All records remain in localStorage.
    */

    saveToStorage(
        "transportExpenses",
        transportExpenses
    );


    updateExpenseUI();

    closeExpenseModal();
}


/* UPDATE EXPENSE UI */

function updateExpenseUI() {

    displayExpenses();

    updateExpenseSummary();

    updateDashboardExpense();
}


/* DISPLAY EXPENSE TABLE */

function displayExpenses() {

    const tableBody =
        document.getElementById(
            "expenseTableBody"
        );

    const emptyState =
        document.getElementById(
            "expenseEmptyState"
        );


    if (!tableBody || !emptyState) {
        return;
    }


    tableBody.innerHTML = "";


    if (transportExpenses.length === 0) {

        emptyState.style.display =
            "block";


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


    emptyState.style.display =
        "none";


    transportExpenses.forEach(
        (expense, index) => {

            const row =
                document.createElement("tr");


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


            tableBody.appendChild(row);
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
   10-DAY SUMMARY
   ========================================================= */


/*
   Returns the latest 10 unique dates
   for which expenses exist.
*/

function getLast10UniqueDates() {

    const dates = [
        ...new Set(
            transportExpenses
                .map(expense => expense.date)
                .filter(Boolean)
        )
    ];


    dates.sort(
        (a, b) =>
            new Date(b) -
            new Date(a)
    );


    return dates.slice(0, 10);
}


/* GET EXPENSES FROM LAST 10 UNIQUE DAYS */

function getLast10DayExpenses() {

    const dates =
        getLast10UniqueDates();


    return transportExpenses.filter(
        expense =>
            dates.includes(
                expense.date
            )
    );
}


/* =========================================================
   EXPENSE SUMMARY
   ========================================================= */

function updateExpenseSummary() {

    const tenDayExpenses =
        getLast10DayExpenses();


    const uniqueDates =
        getLast10UniqueDates();


    const total =
        tenDayExpenses.reduce(
            (sum, expense) =>
                sum +
                Number(
                    expense.amount || 0
                ),
            0
        );


    const numberOfDays =
        uniqueDates.length;


    const average =
        numberOfDays > 0
            ? total / numberOfDays
            : 0;


    /*
       Budget is based on the actual number
       of unique days in the 10-day summary.
    */

    const budget =
        numberOfDays * dailyBudget;


    /*
       Savings should not become negative.
       If expense is above budget, savings = ₹0.
    */

    const savings =
        Math.max(
            budget - total,
            0
        );


    const tenDayTotal =
        document.getElementById(
            "tenDayTotal"
        );

    if (tenDayTotal) {

        tenDayTotal.textContent =
            formatMoney(total);
    }


    const averageExpense =
        document.getElementById(
            "averageExpense"
        );

    if (averageExpense) {

        averageExpense.textContent =
            formatMoney(
                Math.round(average)
            );
    }


    const expenseSavings =
        document.getElementById(
            "expenseSavings"
        );

    if (expenseSavings) {

        expenseSavings.textContent =
            formatMoney(savings);
    }


    /* ALL TRANSPORT EXPENSE */

    const allTotal =
        transportExpenses.reduce(
            (sum, expense) =>
                sum +
                Number(
                    expense.amount || 0
                ),
            0
        );


    const totalTransportExpense =
        document.getElementById(
            "totalTransportExpense"
        );

    if (totalTransportExpense) {

        totalTransportExpense.textContent =
            formatMoney(allTotal);
    }


    /* TODAY EXPENSE */

    const todayTotal =
        getTodayExpense();


    const todayExpense =
        document.getElementById(
            "todayExpense"
        );

    if (todayExpense) {

        todayExpense.textContent =
            formatMoney(todayTotal);
    }


    updateDailyBudget(
        todayTotal
    );
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
   DAILY BUDGET UI
   ========================================================= */

function updateDailyBudget(amount) {

    const budget =
        Number(dailyBudget) || 100;


    const percentage =
        Math.min(
            (amount / budget) * 100,
            100
        );


    const remaining =
        budget - amount;


    const percentageElement =
        document.getElementById(
            "budgetPercentage"
        );


    if (percentageElement) {

        percentageElement.textContent =
            Math.round(percentage) + "%";
    }


    const spentElement =
        document.getElementById(
            "budgetSpent"
        );


    if (spentElement) {

        spentElement.textContent =
            formatMoney(amount);
    }


    const remainingElement =
        document.getElementById(
            "budgetRemaining"
        );


    if (remainingElement) {

        remainingElement.textContent =
            formatMoney(
                Math.max(
                    remaining,
                    0
                )
            );
    }


    /* Budget circle */

    const circle =
        document.getElementById(
            "budgetCircle"
        );


    if (circle) {

        const degree =
            percentage * 3.6;


        circle.style.background =
            `conic-gradient(
                #6c4ce4 0deg
                ${degree}deg,
                #eeeaf4
                ${degree}deg
                360deg
            )`;
    }


    /* Optional budget input */

    const budgetInput =
        document.getElementById(
            "dailyBudgetInput"
        );


    if (budgetInput) {

        budgetInput.value =
            dailyBudget;
    }


    /* Optional budget display */

    const budgetDisplay =
        document.getElementById(
            "dailyBudgetDisplay"
        );


    if (budgetDisplay) {

        budgetDisplay.textContent =
            formatMoney(
                dailyBudget
            );
    }
}


/* =========================================================
   DASHBOARD EXPENSE
   ========================================================= */

function updateDashboardExpense() {

    const tenDayExpenses =
        getLast10DayExpenses();


    const uniqueDates =
        getLast10UniqueDates();


    const total =
        tenDayExpenses.reduce(
            (sum, expense) =>
                sum +
                Number(
                    expense.amount || 0
                ),
            0
        );


    /*
       Use the same number of days
       as the Transport 10-day summary.
    */

    const numberOfDays =
        uniqueDates.length;


    const totalBudget =
        numberOfDays * Number(dailyBudget);


    const savings =
        Math.max(
            totalBudget - total,
            0
        );


    const percentage =
        totalBudget > 0
            ? Math.min(
                (total / totalBudget) * 100,
                100
            )
            : 0;


    /* DASHBOARD EXPENSE */

    const expenseElement =
        document.getElementById(
            "dashTenDayExpense"
        );


    if (expenseElement) {

        expenseElement.textContent =
            formatMoney(total);
    }


    /* DASHBOARD BUDGET */

    const budgetElement =
        document.getElementById(
            "dashTenDayBudget"
        );


    if (budgetElement) {

        budgetElement.textContent =
            formatMoney(totalBudget);
    }


    /* DASHBOARD TOTAL */

    const totalElement =
        document.getElementById(
            "dashTenDayTotal"
        );


    if (totalElement) {

        totalElement.textContent =
            formatMoney(total);
    }


    /* DASHBOARD SAVINGS */

    const savingsElement =
        document.getElementById(
            "dashTenDaySavings"
        );


    if (savingsElement) {

        savingsElement.textContent =
            formatMoney(savings);
    }


    /* DASHBOARD CIRCLE */

    const circle =
        document.getElementById(
            "dashExpenseCircle"
        );


    if (circle) {

        const degree =
            percentage * 3.6;


        circle.style.background =
            `conic-gradient(
                #6c4ce4 0deg
                ${degree}deg,
                #eeeaf4
                ${degree}deg
                360deg
            )`;
    }


    /* TODAY */

    const today =
        getTodayExpense();


    const todaySpent =
        document.getElementById(
            "dashTodaySpent"
        );


    if (todaySpent) {

        todaySpent.textContent =
            `${formatMoney(today)} spent today`;
    }


    /* DAILY SAVINGS */

    const dailySavings =
        Math.max(
            Number(dailyBudget) - today,
            0
        );


    const dashSavings =
        document.getElementById(
            "dashSavings"
        );


    if (dashSavings) {

        dashSavings.textContent =
            formatMoney(
                dailySavings
            );
    }


    /* SAVINGS NOTE */

    const note =
        document.getElementById(
            "dashSavingsNote"
        );


    if (note) {

        if (today > dailyBudget) {

            note.textContent =
                `${formatMoney(
                    today - dailyBudget
                )} over budget`;

        } else {

            note.textContent =
                "Within budget";
        }
    }


    /*
       Update dashboard Daily Budget card.

       This works with the existing stat-card
       that contains the orange icon.
    */

    const dashboardBudget =
        document.querySelector(
            ".stat-card .stat-icon.orange"
        );


    if (dashboardBudget) {

        const card =
            dashboardBudget.closest(
                ".stat-card"
            );


        if (card) {

            const budgetValue =
                card.querySelector("h3");


            if (budgetValue) {

                budgetValue.textContent =
                    formatMoney(
                        dailyBudget
                    );
            }
        }
    }
}


/* =========================================================
   EDIT EXPENSE
   ========================================================= */

function editExpense(index) {

    if (
        index < 0 ||
        index >= transportExpenses.length
    ) {
        return;
    }


    editingExpenseIndex =
        index;


    const expense =
        transportExpenses[index];


    const title =
        document.getElementById(
            "expenseModalTitle"
        );


    if (title) {

        title.textContent =
            "Edit Expense";
    }


    const date =
        document.getElementById(
            "expenseDate"
        );


    if (date) {

        date.value =
            expense.date;
    }


    const transport =
        document.getElementById(
            "expenseTransport"
        );


    if (transport) {

        transport.value =
            expense.transport;
    }


    const route =
        document.getElementById(
            "expenseRoute"
        );


    if (route) {

        route.value =
            expense.route;
    }


    const amount =
        document.getElementById(
            "expenseAmount"
        );


    if (amount) {

        amount.value =
            expense.amount;
    }


    const modal =
        document.getElementById(
            "expenseModal"
        );


    if (modal) {

        modal.classList.add("show");
    }
}


/* =========================================================
   DELETE EXPENSE
   ========================================================= */

function deleteExpense(index) {

    if (
        index < 0 ||
        index >= transportExpenses.length
    ) {
        return;
    }


    deletingExpenseIndex =
        index;


    const expense =
        transportExpenses[index];


    const nameElement =
        document.getElementById(
            "deleteExpenseName"
        );


    if (nameElement) {

        nameElement.textContent =
            `${formatDate(
                expense.date
            )} - ${formatMoney(
                expense.amount
            )}`;
    }


    const modal =
        document.getElementById(
            "expenseDeleteModal"
        );


    if (modal) {

        modal.classList.add("show");
    }
}


/* CLOSE DELETE EXPENSE */

function closeExpenseDeleteModal() {

    const modal =
        document.getElementById(
            "expenseDeleteModal"
        );


    if (modal) {

        modal.classList.remove("show");
    }


    deletingExpenseIndex =
        -1;
}


/* CONFIRM DELETE EXPENSE */

function confirmDeleteExpense() {

    if (
        deletingExpenseIndex === -1
    ) {
        return;
    }


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


/* =========================================================
   DAILY BUDGET EDIT
   =========================================================
   
   These functions are safe even if the current HTML
   does not contain a budget modal.
   ========================================================= */

function openBudgetModal() {

    const input =
        document.getElementById(
            "dailyBudgetInput"
        );


    if (input) {

        input.value =
            dailyBudget;
    }


    const modal =
        document.getElementById(
            "budgetModal"
        );


    if (modal) {

        modal.classList.add("show");
    }
}


function closeBudgetModal() {

    const modal =
        document.getElementById(
            "budgetModal"
        );


    if (modal) {

        modal.classList.remove("show");
    }
}


function saveBudget() {

    const input =
        document.getElementById(
            "dailyBudgetInput"
        );


    if (!input) {
        return;
    }


    const value =
        Number(input.value);


    if (
        isNaN(value) ||
        value <= 0
    ) {

        alert(
            "Please enter a valid daily budget."
        );

        input.focus();

        return;
    }


    dailyBudget =
        value;


    saveToStorage(
        "dailyBudget",
        dailyBudget
    );


    updateExpenseUI();

    updateDashboardExpense();

    closeBudgetModal();
}


/* =========================================================
   MODAL OUTSIDE CLICK
   ========================================================= */

document.addEventListener(
    "click",
    function (event) {

        const modals =
            document.querySelectorAll(
                ".modal-overlay.show"
            );


        modals.forEach(modal => {

            if (event.target === modal) {

                modal.classList.remove(
                    "show"
                );
            }
        });


        const deleteModals =
            document.querySelectorAll(
                ".delete-overlay.show"
            );


        deleteModals.forEach(modal => {

            if (event.target === modal) {

                modal.classList.remove(
                    "show"
                );
            }
        });
    }
);


/* =========================================================
   ESC KEY
   ========================================================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key !== "Escape") {
            return;
        }


        document
            .querySelectorAll(
                ".modal-overlay.show"
            )
            .forEach(modal => {

                modal.classList.remove(
                    "show"
                );
            });


        document
            .querySelectorAll(
                ".delete-overlay.show"
            )
            .forEach(modal => {

                modal.classList.remove(
                    "show"
                );
            });
    }
);


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

        updateDashboardExpense();

        updateDailyBudget(
            getTodayExpense()
        );
    }
);
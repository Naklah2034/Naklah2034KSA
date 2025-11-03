function setLanguage(lang) {
  localStorage.setItem("lang", lang);
  window.location.href = "page2.html";
}

// ===== تحميل النصوص عند فتح أي صفحة =====
document.addEventListener("DOMContentLoaded", () => {
  const lang = localStorage.getItem("lang") || "ar";

  // النصوص حسب اللغة
  const texts = {
    ar: {
      formTitle: "أدخل بياناتك",
      name: "الاسم الكامل",
      phone: "رقم الجوال",
      email: "الإيميل",
      age: "العمر",
      next: "التالي",
      nationalityTitle: "اختر جنسيتك ومدينتك",
      cityLabel: "المدينة",
      jobTitle: "اختر الوظيفة",
      org: "منظم",
      guard: "قارد",
      expTitle: "خبرتك في التنظيم",
      expPlaceholder: "اكتب خبرتك هنا أو أرفق ملفاتك وصورك",
      save: "حفظ",
      success: "تم حفظ بياناتك بنجاح 🌴",
      wrongPass: "كلمة المرور غير صحيحة!",
      deleteConfirm: "هل أنت متأكد أنك تريد حذف كل البيانات؟",
      noData: "لا توجد بيانات محفوظة",
      allDeleted: "تم حذف جميع البيانات",
    },
    en: {
      formTitle: "Enter your details",
      name: "Full Name",
      phone: "Phone Number",
      email: "Email",
      age: "Age",
      next: "Next",
      nationalityTitle: "Select your nationality and city",
      cityLabel: "City",
      jobTitle: "Select your role",
      org: "Organizer",
      guard: "Guard",
      expTitle: "Your experience in organizing",
      expPlaceholder: "Write your experience or upload files/photos",
      save: "Save",
      success: "Your information has been saved successfully 🌴",
      wrongPass: "Incorrect password!",
      deleteConfirm: "Are you sure you want to delete all data?",
      noData: "No saved data found",
      allDeleted: "All data deleted",
    },
  };

  const t = texts[lang];

  // ===== الصفحة 2: البيانات =====
  if (document.getElementById("formTitle")) {
    document.getElementById("formTitle").textContent = t.formTitle;
    document.getElementById("name").placeholder = t.name;
    document.getElementById("phone").placeholder = t.phone;
    document.getElementById("email").placeholder = t.email;
    document.getElementById("age").placeholder = t.age;
    document.getElementById("nextBtn").textContent = t.next;
  }

  // ===== الصفحة 3: الجنسية + المدينة =====
  if (document.getElementById("nationalityTitle")) {
    document.getElementById("nationalityTitle").textContent = t.nationalityTitle;
    document.getElementById("nextBtn").textContent = t.next;

    const nationalitySelect = document.getElementById("nationality");
    nationalitySelect.innerHTML = "";

    const nationalities = lang === "ar"
      ? ["السعودية", "مصر", "اليمن", "سوريا", "الأردن", "فلسطين", "لبنان", "العراق", "تونس", "المغرب", "السودان", "الهند", "باكستان", "الفلبين", "أخرى"]
      : ["Saudi Arabia", "Egypt", "Yemen", "Syria", "Jordan", "Palestine", "Lebanon", "Iraq", "Tunisia", "Morocco", "Sudan", "India", "Pakistan", "Philippines", "Other"];

    nationalities.forEach(n => {
      const opt = document.createElement("option");
      opt.value = n;
      opt.textContent = n;
      nationalitySelect.appendChild(opt);
    });

    // حقل المدينة
    const cityLabel = document.createElement("label");
    cityLabel.textContent = t.cityLabel;
    cityLabel.style.display = "block";
    cityLabel.style.marginTop = "10px";

    const cityInput = document.createElement("input");
    cityInput.id = "city";
    cityInput.type = "text";
    cityInput.placeholder = t.cityLabel;

    nationalitySelect.insertAdjacentElement("afterend", cityInput);
    nationalitySelect.insertAdjacentElement("afterend", cityLabel);
  }

  // ===== الصفحة 4: الوظيفة =====
  if (document.getElementById("jobTitle")) {
    document.getElementById("jobTitle").textContent = t.jobTitle;
    document.getElementById("orgBtn").textContent = t.org;
    document.getElementById("guardBtn").textContent = t.guard;
  }

  // ===== الصفحة 5: الخبرة =====
  if (document.getElementById("expTitle")) {
    document.getElementById("expTitle").textContent = t.expTitle;
    document.getElementById("experience").placeholder = t.expPlaceholder;
    document.getElementById("saveBtn").textContent = t.save;
  }

  // ===== نموذج البيانات =====
  const form1 = document.getElementById("form1");
  if (form1) {
    form1.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = {
        name: document.getElementById("name").value,
        phone: document.getElementById("phone").value,
        email: document.getElementById("email").value,
        age: document.getElementById("age").value,
      };
      localStorage.setItem("userData", JSON.stringify(data));
      window.location.href = "page3.html";
    });
  }
});

// ===== حفظ الجنسية والمدينة =====
function saveNationality() {
  let data = JSON.parse(localStorage.getItem("userData")) || {};
  const selected = document.getElementById("nationality").value;
  const city = document.getElementById("city").value || "-";

  if (selected === "أخرى" || selected === "Other") {
    const other = prompt("اكتب جنسيتك / Enter your nationality:");
    data.nationality = other || selected;
  } else {
    data.nationality = selected;
  }
  data.city = city;

  localStorage.setItem("userData", JSON.stringify(data));
  window.location.href = "page4.html";
}

// ===== حفظ الوظيفة =====
function selectJob(job) {
  let data = JSON.parse(localStorage.getItem("userData")) || {};
  data.job = job;
  localStorage.setItem("userData", JSON.stringify(data));
  window.location.href = "page5.html";
}

// ===== حفظ الخبرة =====
function saveExperience() {
  const lang = localStorage.getItem("lang") || "ar";
  const t = lang === "ar" ? "تم حفظ بياناتك بنجاح 🌴" : "Your information has been saved successfully 🌴";

  let data = JSON.parse(localStorage.getItem("userData")) || {};
  data.experience = document.getElementById("experience").value;
  localStorage.setItem("userData", JSON.stringify(data));
  alert(t);
}

// ===== صفحة الأدمن =====
function checkAdmin() {
  const pass = document.getElementById("adminPass").value;
  const lang = localStorage.getItem("lang") || "ar";
  const t = lang === "ar" ? "كلمة المرور غير صحيحة!" : "Incorrect password!";

  const correctPass = "nakhla123"; // تقدر تغيّرها

  if (pass === correctPass) {
    document.getElementById("loginSection").style.display = "none";
    document.getElementById("dataSection").style.display = "block";
    loadUserData();
  } else {
    alert("❌ " + t);
  }
}

// ===== تحميل البيانات في جدول الأدمن =====
function loadUserData() {
  const lang = localStorage.getItem("lang") || "ar";
  const noDataText = lang === "ar" ? "لا توجد بيانات محفوظة" : "No saved data found";

  const table = document.getElementById("userTable");
  const user = JSON.parse(localStorage.getItem("userData"));
  if (!user) {
    table.innerHTML = `<tr><td colspan='8'>${noDataText}</td></tr>`;
    return;
  }

  table.innerHTML = `
    <tr>
      <td>${user.name || ""}</td>
      <td>${user.phone || ""}</td>
      <td>${user.email || ""}</td>
      <td>${user.age || ""}</td>
      <td>${user.nationality || ""}</td>
      <td>${user.city || ""}</td>
      <td>${user.job || ""}</td>
      <td>${user.experience || ""}</td>
    </tr>
  `;
}

// ===== حذف جميع البيانات =====
function clearAll() {
  const lang = localStorage.getItem("lang") || "ar";
  const confirmMsg = lang === "ar"
    ? "هل أنت متأكد أنك تريد حذف كل البيانات؟"
    : "Are you sure you want to delete all data?";
  const deletedMsg = lang === "ar" ? "تم حذف جميع البيانات" : "All data deleted";

  if (confirm("🗑️ " + confirmMsg)) {
    localStorage.clear();
    document.getElementById("userTable").innerHTML =
      `<tr><td colspan='8'>${deletedMsg}</td></tr>`;
  }
}
<script>
document.addEventListener("DOMContentLoaded", () => {
  const lang = localStorage.getItem("lang") || "ar";
  const nationalitySelect = document.getElementById("nationality");

  const nationalities = lang === "ar"
    ? [
        "السعودية", "مصر", "اليمن", "سوريا", "الأردن", "فلسطين", "لبنان",
        "العراق", "السودان", "تونس", "الجزائر", "المغرب", "ليبيا",
        "الكويت", "الإمارات", "البحرين", "قطر", "عُمان",
        "تركيا", "الهند", "باكستان", "الفلبين", "إندونيسيا",
        "ماليزيا", "نيبال", "إثيوبيا", "الصومال", "أفغانستان",
        "فرنسا", "ألمانيا", "أمريكا", "بريطانيا", "كندا", "إيطاليا", "إسبانيا",
        "أستراليا", "الصين", "كوريا الجنوبية", "اليابان", "روسيا", "أخرى"
      ]
    : [
        "Saudi Arabia", "Egypt", "Yemen", "Syria", "Jordan", "Palestine", "Lebanon",
        "Iraq", "Sudan", "Tunisia", "Algeria", "Morocco", "Libya",
        "Kuwait", "UAE", "Bahrain", "Qatar", "Oman",
        "Turkey", "India", "Pakistan", "Philippines", "Indonesia",
        "Malaysia", "Nepal", "Ethiopia", "Somalia", "Afghanistan",
        "France", "Germany", "USA", "UK", "Canada", "Italy", "Spain",
        "Australia", "China", "South Korea", "Japan", "Russia", "Other"
      ];

  nationalities.forEach(n => {
    const opt = document.createElement("option");
    opt.value = n;
    opt.textContent = n;
    nationalitySelect.appendChild(opt);
  });
});
</script>
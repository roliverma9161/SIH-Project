// ========================================
// CAREFLOW VOICE TYPING
// ========================================

let recognition;

let isRecording = false;


// Check browser support

if (
    "webkitSpeechRecognition" in window ||
    "SpeechRecognition" in window
) {

    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;

    recognition = new SpeechRecognition();


    // Continuous speech

    recognition.continuous = true;


    // Return results while speaking

    recognition.interimResults = true;


    // English for now

    recognition.lang = "en-IN";


    // When speech is detected

    recognition.onresult = function(event) {

        let finalText = "";

        for (
            let i = event.resultIndex;
            i < event.results.length;
            i++
        ) {

            const transcript =
                event.results[i][0].transcript;

            if (event.results[i].isFinal) {

                finalText += transcript + " ";

            }

        }


        const voiceText =
            document.getElementById("voiceText");


        if (voiceText) {

            voiceText.value += finalText;

        }

    };


    // Recording started

    recognition.onstart = function() {

        isRecording = true;

        const button =
            document.getElementById("voiceButton");

        if (button) {

            button.innerHTML =
                "🔴 Listening...";

            button.classList.add("recording");

        }

    };


    // Recording stopped

    recognition.onend = function() {

        isRecording = false;

        const button =
            document.getElementById("voiceButton");

        if (button) {

            button.innerHTML =
                "🎙️ Start Speaking";

            button.classList.remove("recording");

        }

    };


    // Error handling

    recognition.onerror = function(event) {

        console.log(
            "Voice recognition error:",
            event.error
        );

    };

}


// ========================================
// START / STOP VOICE
// ========================================

function toggleVoice() {

    if (!recognition) {

        alert(
            "Voice typing is not supported in this browser."
        );

        return;

    }


    if (isRecording) {

        recognition.stop();

    } else {

        recognition.start();

    }

}

/* appointment */
const bookButton =
    document.getElementById("bookAppointment");


bookButton.addEventListener("click", function () {

    const doctor =
        document.getElementById("doctor").value;

    const date =
        document.getElementById("appointmentDate").value;

    const time =
        document.getElementById("appointmentTime").value;

    const reason =
        document.getElementById("reason").value;


    // Check required information

    if (!doctor) {
        alert("Please select a doctor.");
        return;
    }

    if (!date) {
        alert("Please select an appointment date.");
        return;
    }

    if (!time) {
        alert("Please select an appointment time.");
        return;
    }


    // Get appointment type

    const appointmentType =
        document.querySelector(
            'input[name="type"]:checked'
        ).value;


    // Temporary frontend appointment object

    const appointment = {

        doctor: doctor,

        date: date,

        time: time,

        type: appointmentType,

        reason: reason

    };


    console.log(
        "Appointment:",
        appointment
    );


    alert(
        "Appointment booked successfully! ✓"
    );

});


/* records */

const searchInput =
    document.getElementById("searchInput");

const recordFilter =
    document.getElementById("recordFilter");

const records =
    document.querySelectorAll(".record-card");

const noResults =
    document.getElementById("noResults");



function filterRecords() {

    const searchText =
        searchInput.value.toLowerCase().trim();

    const selectedType =
        recordFilter.value;

    let visibleRecords = 0;


    records.forEach(function(record) {

        const text =
            record.textContent.toLowerCase();

        const type =
            record.getAttribute("data-type");


        const matchesSearch =
            text.includes(searchText);

        const matchesFilter =
            selectedType === "all" ||
            type === selectedType;


        if (
            matchesSearch &&
            matchesFilter
        ) {

            record.style.display = "flex";

            visibleRecords++;

        } else {

            record.style.display = "none";

        }

    });


    if (visibleRecords === 0) {

        noResults.style.display = "block";

    } else {

        noResults.style.display = "none";

    }

}



searchInput.addEventListener(
    "input",
    filterRecords
);


recordFilter.addEventListener(
    "change",
    filterRecords
);



/* ================= VIEW DETAILS ================= */

const viewButtons =
    document.querySelectorAll(".view-btn");


viewButtons.forEach(function(button) {

    button.addEventListener(
        "click",
        function() {

            alert(
                "Record details will open here."
            );

        }
    );

});



/* ================= DOWNLOAD ALL ================= */

const downloadAll =
    document.getElementById("downloadAll");


downloadAll.addEventListener(
    "click",
    function() {

        alert(
            "Your medical records will be downloaded here."
        );

    }
);
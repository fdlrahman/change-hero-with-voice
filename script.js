swal(`Sebut "Aqua" untuk mengganti hero andalanmu!`).then(() => swal(`Allow microphone, terlebih dahulu.`));

async function main() {
    changeCharacter();

    // Minta ijin audio record
    window.SpeechRecognition = window.webkitSpeechRecognition;

    const recognition = new SpeechRecognition();

    recognition.interimResults = true;
    recognition.continuous = true;
    recognition.lang = "en-US";

    recognition.onresult = (e) => {
        const transcript = Array.from(e.results)
            .map((result) => result[0])
            .map((result) => result.transcript);

        isItTrueCommand(transcript);
    };

    recognition.start();
}

// ['change']
let checked = 0,
    limit = 50;

function isItTrueCommand(transcript) {
    const command = "aqua";

    if (transcript.length > checked) {
        checked += 1;

        const voiceLast = transcript[checked - 1];
        if (voiceLast.indexOf(command) >= 0) {
            changeCharacter();
        }

        console.log(voiceLast);
    }

    console.log("call");
}

async function changeCharacter() {
    const random = Math.round(Math.random() * 50);
    let { name, images, about } = await $.get("https://naruto-api.herokuapp.com/api/v1/characters/" + random);

    images = `background-image: url(${images[0]})`;
    about = about.join("").slice(0, 100);

    $(".hero-name").text(name);
    $(".hero-img").attr("style", images);
    $(".hero-description").text(about);
}

main();

const form = document.getElementById("registrationForm");
form.addEventListener("submit", function(event) {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const category = document.getElementById("category").value;
    const registrationId ="EVT-2026-" +Math.random().toString(36).substring(2, 7).toUpperCase();
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;

fetch("http://localhost:5000/api/register", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        registrationId: registrationId,
        name: name,
        email: email,
        phone: phone,
        ticketType: category
    })
})
.then(response => response.json())
.then(data => {

    if (data.success) {
        console.log("✅ Saved to MongoDB:", data);
    } else {
        console.log("❌ Database error:", data);
    }

})
.catch(error => {
    console.error("❌ Backend connection error:", error);
});
    document.getElementById("passName").textContent = name;

    document.getElementById("passCategory").textContent = category;
    document.getElementById("passTicket").textContent = category + " Pass";
    document.getElementById("passId").textContent = registrationId;
    
    const qrcode = document.getElementById("qrcode");
    qrcode.innerHTML = "";
    new QRCode(document.getElementById("qrcode"), {
    text: registrationId,
    width: 120,
    height: 120
});
alert("Registration successful!\n\n" +"Your Registration ID is: " +registrationId);

  const photoInput = document.getElementById("photo");
const passPhoto = document.getElementById("passPhoto");

if (photoInput.files.length > 0) {
    const file = photoInput.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        passPhoto.src = e.target.result;
    };

    reader.readAsDataURL(file);
}

    

const downloadButton=document.getElementById("downloadPass");
downloadButton.addEventListener("click", async function (event) {
    event.preventDefault();

    const pass = document.getElementById("digitalPass");

    if (!pass) {
        console.error("Digital pass not found");
        alert("Digital pass not found");
        return;
    }

    if (typeof html2canvas === "undefined") {
        console.error("html2canvas library not loaded");
        alert("Download library is not loaded.");
        return;
    }

    try {
        const canvas = await html2canvas(pass, {
            scale: 2,
            useCORS: true
        });

        const link = document.createElement("a");

        link.href = canvas.toDataURL("image/png");
        link.download = "EventPass.png";

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        console.log("Download successful");

    } catch (error) {
        console.error("Download error:", error);
        alert("Download failed. Please try again.");
    }
});

});
// 
    

// });
// alert("Registration successful!\n\n" +"Your Registration ID is: " +registrationId);



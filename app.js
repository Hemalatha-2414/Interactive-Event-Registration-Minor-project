const form = document.getElementById("registrationForm");
form.addEventListener("submit", function(event) {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const category = document.getElementById("category").value;
    const registrationId ="EVT-2026-" +Math.random().toString(36).substring(2, 7).toUpperCase();
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


    reader.readAsDataURL(photoInput.files[0]);

   

        reader.readAsDataURL(file);
    


const downloadButton = document.getElementById("downloadPass");

downloadButton.addEventListener("click", function() {

    const pass = document.getElementById("digitalPass");

    html2canvas(pass, {
        scale: 2,
        useCORS: true,
        backgroundColor: null
    }).then(function(canvas) {

        const link = document.createElement("a");

        link.download = "IGNITE-26-Digital-Pass.png";
        link.href = canvas.toDataURL("image/png");

        link.click();

       
        setTimeout(function() {
            alert("✅ Your Digital Pass has been downloaded successfully!");
        }, 500);

    }).catch(function(error) {
        alert("❌ Download failed. Please try again.");
        console.error(error);
    });

});
    

});
// alert("Registration successful!\n\n" +"Your Registration ID is: " +registrationId);



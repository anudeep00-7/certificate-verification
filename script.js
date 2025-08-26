async function verifyCertificate() {
  const rollNo = document.getElementById('certIdInput').value.trim();
  const resultDiv = document.getElementById('result');
  const certDiv = document.getElementById('certificate');
  const downloadBtn = document.getElementById('downloadBtn');

  resultDiv.innerHTML = '';
  resultDiv.classList.remove('hidden');
  certDiv.classList.add('hidden');
  downloadBtn.classList.add('hidden');

  resultDiv.innerHTML = `
    <div class="flex justify-center items-center p-4 rounded-md bg-gray-100">
      <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <p class="text-sm font-medium text-gray-700">Verifying...</p>
    </div>
  `;

  if (!rollNo) {
    setTimeout(() => {
      resultDiv.innerHTML = createAlert('red', 'Error', 'Please enter a Certificate ID.');
    }, 500);
    return;
  }

  try {
    const encodedRollNo = encodeURIComponent(rollNo);
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbzXAquCsFvOGnt7ilkpiTwt8Db-3v15Beshafph4Gl7QKyQTgD-5RcIk2cOw579evSPFw/exec?rollno=" + encodedRollNo
    );

    if (!response.ok) throw new Error(`Network response was not ok. Status: ${response.status}`);

    const text = await response.text();
    console.log("Response:", text);

    if (text.includes("✅ Certificate generated for:")) {
      const name = text.replace("✅ Certificate generated for:", "").replace(/ *\([^)]*\) */g, "").trim();
      resultDiv.innerHTML = createAlert('green', 'Certificate is Valid', `This certificate was issued to <strong>${name}</strong>.`);

      document.getElementById('certName').textContent = name;
      certDiv.classList.remove('hidden');
      downloadBtn.classList.remove('hidden');
    } else {
      resultDiv.innerHTML = createAlert('red', 'Certificate Not Found', 'The ID was not found. Please check for typos.');
    }
  } catch (error) {
    console.error("Error:", error);
    resultDiv.innerHTML = createAlert('red', 'Application Error', 'Could not retrieve certificate data.');
  }
}

function downloadCertificate() {
  const certDiv = document.getElementById("certificate");
  const name = document.getElementById('certName').textContent || 'certificate';

  html2canvas(certDiv, { scale: 2, useCORS: true }).then(canvas => {
    const link = document.createElement("a");
    link.download = `${name.replace(/\s+/g, '_')}_certificate.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  });
}

function createAlert(color, title, message) {
  const colors = {
    red: { bg: 'bg-red-50', text: 'text-red-800', icon: 'text-red-400' },
    green: { bg: 'bg-green-50', text: 'text-green-800', icon: 'text-green-400' }
  };
  const c = colors[color];

  return `
    <div class="rounded-md ${c.bg} p-4">
      <div class="flex">
        <div class="flex-shrink-0">
          <svg class="h-5 w-5 ${c.icon}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            ${color === 'green'
              ?

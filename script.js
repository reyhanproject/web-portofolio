let dataContact = [];

const getData = async () => {
  try {
    const response = await fetch("http://localhost:8000/api/contacts", {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Get data error");
    }

    const data = await response.json();

    dataContact = [...dataContact, ...data];
    console.log(dataContact);
    renderData();
  } catch (err) {
    console.log("unexpected error");
  }
};

const renderData = () => {
  const bodyData = document.getElementById("bodyData");
  console.log("fungs");
  const body = dataContact
    .map(
      (contact) =>
        `
        <h2 class="bg-primary">${contact.nama}</h2>
        `
    )
    .join("");

  bodyData.innerHTML = body;
};

getData();

// Form Submission
const submitBtn = document.getElementById('submitBtn');

if (submitBtn) {
    submitBtn.addEventListener('click', async function () {
        const nama = document.getElementById('nama')?.value;
        const email = document.getElementById('email')?.value;
        const pesan = document.getElementById('pesan')?.value;

        // Cek jika ada input yang kosong
        if (!nama || !email || !pesan) {
            alert('Please fill out all fields');
            return;
        }

        // Validasi format email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }

        const formData = {
            name: nama,
            email: email,
            pesan: pesan,
        };

        try {
            const response = await fetch('http://localhost:8000/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error(`Failed to send pesan: ${response.statusText}`);
            }

            const data = await response.json();
            console.log('Success:', data);
            alert('Message sent successfully!');
        } catch (error) {
            console.error('Error:', error);
            alert('Error sending message. Please try again later.');
        }
    });
} else {
    console.error("Submit button (submitBtn) not found");
}

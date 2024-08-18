document.addEventListener("DOMContentLoaded", () => {
    let t = document.getElementById("ip"),
        e = document.getElementById("isp"),
        n = document.getElementById("city"),
        o = document.getElementById("flag"),
        r = document.getElementById("coordinates"),
        i = document.getElementById("timezone");
    async function a() {
        try {
            let t = await fetch("https://api.ipgeolocation.io/ipgeo?apiKey=df560079125446d0bc590f8b7443ef8a");
            if (!t.ok) throw Error(`ipgeolocation.io error: ${t.statusText}`);
            let e = await t.json();
            return e
        } catch (n) {
            throw console.error("Error fetching geolocation data:", n), n
        }
    }
    async function c() {
        try {
            let c = await a();
            t.textContent = c.ip, e.textContent = c.isp, n.textContent = c.city, o.src = c.country_flag, o.alt = c.country_name, r.textContent = `${c.latitude}, ${c.longitude}`, i.textContent = c.time_zone.name
        } catch (g) {
            t.textContent = "Error fetching IP address", e.textContent = "Error fetching ISP", n.textContent = "Error fetching city", o.textContent = "Error fetching flag", r.textContent = "Error fetching coordinates", i.textContent = "Error fetching timezone", console.error("Error:", g)
        }
    }
    c()
});

document.querySelector('.custom-file-button').addEventListener('click', function() {
    document.getElementById('select-file').click();
});

document.getElementById('select-file').addEventListener('change', function(event) {
    var file = event.target.files[0];
    var reader = new FileReader();
    
    reader.onload = function(e) {
        var preview = document.getElementById('image-preview');
        preview.src = e.target.result;
        preview.style.display = 'block';
    } 
    
    reader.readAsDataURL(file);
});

document.getElementById('upload-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    const formData = new FormData();
    const fileInput = document.getElementById('select-file');
    
    if (fileInput.files.length > 0) {
        formData.append('file', fileInput.files[0]);
        
        try {
            const response = await fetch('https://telegra.ph/upload', {
                method: 'POST',
                body: formData
            });
            
            const json = await response.json();
            
            if (json.error) {
                if (json.error === "No files passed") {
                    window.location.href = "https://phobosid.github.io/error/no-file-uploaded.html";
                } else if (json.error === "File type invalid") {
                    window.location.href = "https://phobosid.github.io/error/invalid-file-type.html";
                }
            } else if (json[0] && json[0].src) {
                const imageUrl = `https://telegra.ph${json[0].src}`;
                window.location.href = `/upload-success.html?image=${encodeURIComponent(imageUrl)}`;
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    } else {
        alert("Please select a file to upload.");
    }
});
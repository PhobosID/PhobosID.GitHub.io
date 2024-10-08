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
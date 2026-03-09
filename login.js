
function startLogin() {
    const u = document.getElementById('user-input').value;
    const p = document.getElementById('pass-input').value;

    if (u === "admin" && p === "admin123") {
        window.location.href='index.html'
        
        
    } else {
        alert("Incorrect credentials!");
        return;
    }
}
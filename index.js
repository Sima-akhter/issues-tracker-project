

 function startLogin() {
            const u = document.getElementById('user-input').value;
            const p = document.getElementById('pass-input').value;

            if (u === "admin" && p === "admin123") {
                document.getElementById('login-area').style.display = 'none';
                document.getElementById('main-app').classList.remove('hidden');
                
            } else {
                alert("password vul dile kemne khulbe vai");
            }
        }
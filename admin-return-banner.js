/* admin-return-banner.js
   Tampilkan tombol "Kembali ke Admin" saat admin sedang melihat dashboard
   editor / cabang lewat fitur Switch Role. Tidak muncul untuk login biasa.
   Pasang di editor-dashboard.html & cabang-dashboard.html:
   <script src="admin-return-banner.js"></script>  (sebelum </body>) */
(function () {
    var BACKUP_KEY = 'data_user_admin_backup';
    function init() {
        try {
            var backup = localStorage.getItem(BACKUP_KEY);
            var cur = JSON.parse(localStorage.getItem('data_user') || 'null');
            if (!backup || !cur || !cur._viewing_as) return;
            if (document.getElementById('admin-return-banner')) return;

            var bar = document.createElement('div');
            bar.id = 'admin-return-banner';
            bar.style.cssText = 'position:fixed;right:16px;bottom:16px;z-index:2147483647;display:flex;align-items:center;gap:10px;' +
                'background:#0f172a;color:#fff;padding:10px 12px 10px 16px;border-radius:16px;box-shadow:0 10px 30px rgba(0,0,0,.35);' +
                'font:600 12px/1.3 system-ui,-apple-system,Segoe UI,Roboto,sans-serif;max-width:calc(100vw - 32px)';

            var label = document.createElement('span');
            label.textContent = 'Mode admin: melihat sebagai ' + (cur.nama_user || '-') + ' (' + String(cur.role || '').toUpperCase() + ')';

            var btn = document.createElement('button');
            btn.type = 'button';
            btn.textContent = 'Kembali ke Admin';
            btn.style.cssText = 'background:#6366f1;color:#fff;border:0;border-radius:10px;padding:8px 12px;font:700 12px system-ui,sans-serif;cursor:pointer;white-space:nowrap';
            btn.onclick = function () {
                localStorage.setItem('data_user', backup);
                localStorage.removeItem(BACKUP_KEY);
                window.location.href = 'admin-dashboard.html';
            };

            bar.appendChild(label);
            bar.appendChild(btn);
            document.body.appendChild(bar);
        } catch (e) { /* abaikan */ }
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();
})();

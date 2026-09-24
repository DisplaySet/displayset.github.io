// 主题切换控制 (Light / Dark mode)
(function() {
  const THEME_KEY = 'displaypreset_theme';

  function getSavedTheme() {
    return localStorage.getItem(THEME_KEY);
  }

  function getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    if (theme === 'dark' || theme === 'light') {
      document.documentElement.setAttribute('data-theme', theme);
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    updateToggleButtons(theme || getSystemTheme());
  }

  const SUN_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>';
  const MOON_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>';

  function updateToggleButtons(current) {
    document.querySelectorAll('.theme-toggle').forEach(btn => {
      const isDark = current === 'dark';
      btn.innerHTML = isDark ? SUN_ICON : MOON_ICON;
      btn.setAttribute('aria-label', isDark ? '切换到浅色模式' : '切换到深色模式');
      btn.title = isDark ? 'Switch to light mode' : 'Switch to dark mode';
    });
  }

  // 立即初始化（避免闪烁）
  const saved = getSavedTheme();
  if (saved) {
    applyTheme(saved);
  }

  // 监听系统主题变化
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!getSavedTheme()) {
      updateToggleButtons(e.matches ? 'dark' : 'light');
    }
  });

  // 绑定切换事件
  document.addEventListener('DOMContentLoaded', () => {
    updateToggleButtons(getSavedTheme() || getSystemTheme());
    document.querySelectorAll('.theme-toggle').forEach(btn => {
      btn.addEventListener('click', () => {
        const activeTheme = getSavedTheme() || getSystemTheme();
        const nextTheme = activeTheme === 'dark' ? 'light' : 'dark';
        localStorage.setItem(THEME_KEY, nextTheme);
        applyTheme(nextTheme);
      });
    });
  });
})();

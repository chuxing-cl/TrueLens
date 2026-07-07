export function createLoading(): HTMLElement {
  const wrap = document.createElement('div');
  wrap.style.cssText = 'position:fixed;inset:0;display:flex;align-items:center;justify-content:center;background:#050b1f;z-index:9999;';
  wrap.innerHTML = `
    <div style="text-align:center;">
      <div style="width:48px;height:48px;border:3px solid rgba(0,240,255,0.3);border-top-color:#00f0ff;border-radius:50%;animation:spin 1s linear infinite;margin:0 auto;"></div>
      <div style="margin-top:12px;color:#00f0ff;font-family:Orbitron,sans-serif;font-size:14px;letter-spacing:2px;">LOADING</div>
    </div>
  `;
  const style = document.createElement('style');
  style.textContent = '@keyframes spin{to{transform:rotate(360deg)}}';
  wrap.appendChild(style);
  return wrap;
}

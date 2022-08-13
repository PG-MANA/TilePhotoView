function setup_menu_button() {
  drawer_data.menu_icon_fade_out_timer = 0;

  document.getElementById("menu_open").addEventListener("change", function () {
    if (drawer_data.menu_icon_fade_out_timer) {
      clearTimeout(drawer_data.menu_icon_fade_out_timer);
      drawer_data.menu_icon_fade_out_timer = 0;
    }
    const menu_icon = document.getElementById("menu_icon");
    menu_icon.style.opacity = '1';
    menu_icon.style.zIndex = '5';
  })

  drawer_data.enabled = true;
}


function fade_out_menu_icon() {
  if (!drawer_data.enabled) {
    return;
  }
  const menu_icon = document.getElementById("menu_icon");
  if (menu_icon.style.opacity === '0') {
    menu_icon.style.opacity = '1';
    menu_icon.style.zIndex = '5';
    if (drawer_data.menu_icon_fade_out_timer) {
      clearTimeout(drawer_data.menu_icon_fade_out_timer);
      drawer_data.menu_icon_fade_out_timer = 0;
    }
  } else {
    if (drawer_data.menu_icon_fade_out_timer) {
      clearTimeout(drawer_data.menu_icon_fade_out_timer);
      drawer_data.menu_icon_fade_out_timer = 0;
    }
    if (scrollY > 0 && !document.getElementById("menu_open").checked) {
      drawer_data.menu_icon_fade_out_timer = setTimeout(function () {
        const menu_icon = document.getElementById("menu_icon");
        menu_icon.style.opacity = '0';
        menu_icon.addEventListener('transitionend', function () {
          const menu_icon = document.getElementById("menu_icon");
          menu_icon.style.zIndex = '-1';
        }, {once: true});

      }, 2000);
    }
  }
}

drawer_data = {enabled: false};
window.addEventListener("pageshow", function (e) {
  if (e.persisted) {
    window.location.reload()
  }
});

window.addEventListener("load", setup_menu_button);
window.addEventListener("scroll", fade_out_menu_icon);





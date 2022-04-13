import { refs } from './refs';

refs.changeOfTheme.addEventListener('change', onThemeSelected);

async function onThemeSelected(event) {
    let themeCheck = event.target.value;

    if (themeCheck === 'dark') {
        darkTheme();
    } else if (themeCheck === 'light') {
        lightTheme();
    } else {
        autoTheme();
    }  
}

function darkTheme() {
    document.body.style.backgroundColor = '#595959';
    refs.footer.style.backgroundColor = '#2C2B2B';
    refs.footerSupp.style.color = '#FFFFFF';
    refs.footerApp.style.color = '#FFFFFF';
    refs.footerJoin.style.color = '#FFFFFF';
    refs.footerEmail.style.color = '#FFFFFF';
    refs.footerCopy.style.color = '#FFFFFF';

    // зміни для модалки фільму
    refs.modalMovie.style.backgroundColor = '#2C2B2B';
    refs.movieDataTitle.style.color = '#FFF';
    refs.movieDataValue.style.color = '#FFF';
    refs.movieDataAbout.style.color = '#FFF';
    refs.movieDataAboutTitle.style.color = '#FFF';
}

function lightTheme() {
    document.body.style.backgroundColor = '#FFFFFF';
    refs.footer.style.backgroundColor = '#F7F7F7';
    refs.footerSupp.style.color = '#545454';
    refs.footerApp.style.color = '#545454';
    refs.footerJoin.style.color = '#545454';
    refs.footerEmail.style.color = '#545454';
    refs.footerCopy.style.color = '#545454';
    refs.modalMovie.style.backgroundColor = '#ffffff';

    // зміни для модалки фільму
    refs.modalMovie.style.backgroundColor = '#fff';
    refs.movieDataTitle.style.color = '#000';
    refs.movieDataValue.style.color = '#000';
    refs.movieDataAbout.style.color = '#000';
    refs.movieDataAboutTitle.style.color = '#000';
}

window.onload = function autoTheme() {
    const date = new Date();
    const dateNow = date.getHours();
    
    if (dateNow >= 6 && dateNow <= 22) {
        // lightTheme();
        darkTheme();
    } else {
        // darkTheme();
        lightTheme();
    }
}

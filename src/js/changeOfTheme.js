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

    function darkTheme() {
        document.body.style.backgroundColor = '#595959';
        refs.footer.style.backgroundColor = '#2C2B2B';
        // refs.slideTitle.style.color = '#FFFFFF';
        refs.footerSupp.style.color = '#FFFFFF';
        refs.footerApp.style.color = '#FFFFFF';
        refs.footerJoin.style.color = '#FFFFFF';
        refs.footerEmail.style.color = '#FFFFFF';
        refs.footerCopy.style.color = '#FFFFFF';
    }

    function lightTheme() {
        document.body.style.backgroundColor = '#FFFFFF';
        refs.footer.style.backgroundColor = '#F7F7F7';
        // refs.slideTitle.style.color = '#000000';
        refs.footerSupp.style.color = '#000000';
        refs.footerApp.style.color = '#000000';
        refs.footerJoin.style.color = '#000000';
        refs.footerEmail.style.color = '#545454';
        refs.footerCopy.style.color = '#545454';
    }

    function autoTheme() {
        const date = new Date();
        const dateNow = date.getHours();
        
        if (dateNow > 6 && dateNow < 21) {
            lightTheme();
        } else {
            darkTheme();
        }
    }
}



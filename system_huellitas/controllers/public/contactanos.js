const EMAIL_API = 'services/public/email.php';
const FORM_CONTACT = document.getElementById('formContactanos');
const LOADING = document.getElementById('cargaContainer');

document.addEventListener("DOMContentLoaded", () => {
    loadTemplate();
})

FORM_CONTACT.addEventListener("submit", async (event) => {
    event.preventDefault();
    setLoading(true);
    const FORM = new FormData(FORM_CONTACT);
    const DATA = await fetchData(EMAIL_API, 'sendContactUs', FORM)
    setLoading(false);
    LOADING.classList.remove('d-none')
    if(DATA.status){
        LOADING.classList.add('d-none');
        sweetAlert(1, DATA.message, true)
        FORM_CONTACT.reset();
    } else{
        sweetAlert(2, DATA.error, true);
    }
});

// Function to show/hide loading icon (customize based on your implementation)
function setLoading(show) {
    if (show) {
        LOADING.classList.remove('d-none'); // Assuming 'd-none' hides the loading element
    } else {
        LOADING.classList.add('d-none');
    }
}
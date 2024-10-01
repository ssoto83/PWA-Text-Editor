const butInstall = document.getElementById('buttonInstall');
let deferredPrompt;

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
// Store the triggered event
    deferredPrompt = event;
// Update the UI to notify user they can install
    butInstall.style.display = 'block';
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    butInstall.style.display = 'none';

    if (deferredPrompt) {
        deferredPrompt.prompt();
        // wait for the user to respond to the prompt
        const { outcome } = await deferredPrompt.userChoise;
        if (outcome === 'accepted') {
            console.log('user accepted the prompt');
        }else {
            console.log('user dismissed the prompt');
        }

        deferredPrompt = null;
    }
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    console.log('App succesfully installed');
    // Hide the install button
    butInstall.style.display = 'none'; 
});

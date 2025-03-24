import { inject } from 'vendetta';
import { ContextMenu, Button, ContextMenuActionData, ContextMenuButton, MenuItem } from 'vendetta/components';

// Inject the plugin and add the button
export default function() {
    // Function to add the "Hide message" button to the context menu
    inject(ContextMenu, 'contextMenu', (menu: MenuItem[], message: any) => {
        const hideButton: ContextMenuButton = {
            label: 'Hide message',
            action: () => {
                // Call the function to hide the message
                hideMessage(message);
            }
        };

        // Add the button to the context menu
        menu.push(hideButton);

        return menu;
    });

    // Hide message function
    const hideMessage = (message: any) => {
        const messageId = message.id;

        // Hide the message and image
        const messageElement = document.getElementById(`message-${messageId}`);
        if (messageElement) {
            messageElement.style.display = 'none';  // Hide message
        }

        const images = messageElement?.getElementsByTagName('img');
        if (images) {
            for (let img of images) {
                img.style.display = 'none';  // Hide image
            }
        }

        // Add the "Unhide" button
        const unhideButton = document.createElement('button');
        unhideButton.innerText = 'Unhide';
        unhideButton.onclick = () => unhideMessage(messageId);
        messageElement?.appendChild(unhideButton);
    };

    // Unhide message function
    const unhideMessage = (messageId: string) => {
        const messageElement = document.getElementById(`message-${messageId}`);
        if (messageElement) {
            messageElement.style.display = 'block';  // Reveal message
        }

        const images = messageElement?.getElementsByTagName('img');
        if (images) {
            for (let img of images) {
                img.style.display = 'block';  // Reveal image
            }
        }

        // Remove the "Unhide" button
        const unhideButton = messageElement?.querySelector('button');
        if (unhideButton) {
            unhideButton.remove();
        }
    };
}

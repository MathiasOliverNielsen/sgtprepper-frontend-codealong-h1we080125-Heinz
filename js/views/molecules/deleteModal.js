// Simple Delete Confirmation Modal View
import { Div, Button, Paragraph, Heading } from '../atoms/index.js';

export const DeleteConfirmModal = (itemName, onConfirm, onCancel) => {
  // Modal overlay with animation and backdrop blur
  const overlay = document.createElement('div');
  overlay.className = 'fixed inset-0 bg-black bg-opacity-0 flex items-center justify-center z-50 transition-all duration-200';
  overlay.style.backdropFilter = 'blur(2px)';

  // Modal content with slide-up animation
  const modal = Div('bg-white rounded-lg p-6 max-w-sm w-full mx-4 shadow-xl transform scale-95 transition-transform duration-200');

  // Warning icon
  const icon = Div('text-center mb-4 text-4xl');
  icon.innerHTML = '🗑️';

  // Title
  const title = Heading('Fjern produkt?', 2, 'text-lg font-semibold text-gray-800 mb-3 text-center');

  // Message
  const message = Paragraph('text-gray-600 mb-6 text-center text-sm');
  message.innerHTML = `Er du sikker på, at du vil fjerne<br><strong>"${itemName}"</strong><br>fra din kurv?`;

  // Buttons container
  const buttons = Div('flex gap-3');

  // Cancel button
  const cancelBtn = Button('Nej, behold', 'button', 'flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors font-medium');
  cancelBtn.onclick = () => closeModal(false);

  // Delete button
  const deleteBtn = Button('Ja, fjern', 'button', 'flex-1 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors font-medium');
  deleteBtn.onclick = () => closeModal(true);

  // Close modal function
  function closeModal(confirmed) {
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0)';
    modal.style.transform = 'scale(0.95)';

    setTimeout(() => {
      document.body.removeChild(overlay);
      document.removeEventListener('keydown', handleKeydown);

      if (confirmed) {
        if (onConfirm) onConfirm();
      } else {
        if (onCancel) onCancel();
      }
    }, 150);
  }

  buttons.append(cancelBtn, deleteBtn);
  modal.append(icon, title, message, buttons);
  overlay.append(modal);

  // Close on overlay click
  overlay.onclick = (e) => {
    if (e.target === overlay) closeModal(false);
  };

  // Close on Escape key
  const handleKeydown = (e) => {
    if (e.key === 'Escape') closeModal(false);
    if (e.key === 'Enter') closeModal(true); // Enter = confirm
  };

  // Show modal with animation
  document.body.appendChild(overlay);
  document.addEventListener('keydown', handleKeydown);

  // Trigger animations after element is added
  requestAnimationFrame(() => {
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.4)';
    modal.style.transform = 'scale(1)';
  });

  return overlay;
};

// Simple function to show delete confirmation
export const showDeleteConfirm = (itemName) => {
  return new Promise((resolve) => {
    const modal = DeleteConfirmModal(
      itemName,
      () => resolve(true), // User confirmed
      () => resolve(false) // User cancelled
    );
  });
};

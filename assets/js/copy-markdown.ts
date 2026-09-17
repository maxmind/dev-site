// Copy page content as markdown for LLM consumption

function initCopyMarkdown() {
  // A page without a Markdown rendering gets no copy control.
  const alternate = document.querySelector<HTMLLinkElement>(
    'link[rel="alternate"][type="text/markdown"]'
  );
  if (alternate === null) return;
  const markdownPath = alternate.href;

  // Create the copy button
  const copyButton = document.createElement('button');
  copyButton.className = 'copy-markdown-btn';
  copyButton.innerHTML = `
    <div class="icon-wrapper">
      <svg class="icon-copy" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path d="M10 1H3C2.45 1 2 1.45 2 2v9h2V3h7V1zm3 3H6C5.45 4 5 4.45 5 5v10c0 .55.45 1
                  1 1h7c.55 0 1-.45 1-1V5c0-.55-.45-1-1-1zm0 11H6V5h7v10z"/>
      </svg>
      <svg class="icon-check" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path d="M6 10.78l-2.78-2.78-.947.94L6 12.667l7.727-7.727-.947-.94z"/>
      </svg>
    </div>
    <span>Copy for LLM</span>
  `;
  copyButton.title = 'Copy page content as Markdown';

  // Handle button click
  copyButton.addEventListener('click', async (e) => {
    e.preventDefault();

    try {
      // Show loading state
      copyButton.classList.add('loading');
      const spanElement = copyButton.querySelector('span');
      if (spanElement) {
        spanElement.textContent = 'Fetching...';
      }

      // Fetch the markdown content
      const response = await fetch(markdownPath);

      if (!response.ok) {
        throw new Error(`Failed to fetch markdown: ${response.status}`);
      }

      const markdownContent = await response.text();

      // Copy to clipboard
      await navigator.clipboard.writeText(markdownContent);

      // Show success state
      copyButton.classList.remove('loading');
      copyButton.classList.add('success');
      if (spanElement) {
        spanElement.textContent = 'Copied!';
      }

      // Reset button after 3 seconds
      setTimeout(() => {
        copyButton.classList.remove('success');
        if (spanElement) {
          spanElement.textContent = 'Copy for LLM';
        }
      }, 3000);
    } catch (error) {
      console.error('Error copying markdown:', error);

      // Show error state
      copyButton.classList.remove('loading');
      copyButton.classList.add('error');
      const spanElement = copyButton.querySelector('span');
      if (spanElement) {
        spanElement.textContent = 'Error!';
      }

      // Reset button after 3 seconds
      setTimeout(() => {
        copyButton.classList.remove('error');
        if (spanElement) {
          spanElement.textContent = 'Copy for LLM';
        }
      }, 3000);
    }
  });

  // Find the page content container and add the button
  const pageContent = document.querySelector('.page__content');
  if (pageContent) {
    // Insert the button after the title or at the beginning of content.
    // A release note carries its date under the title, so the button goes below
    // the date rather than between the two.
    const pageTitle = pageContent.querySelector('.page__title');
    const noteDate = pageContent.querySelector('.release-note__date');
    const precedingElement = noteDate ?? pageTitle;
    if (precedingElement) {
      precedingElement.insertAdjacentElement('afterend', copyButton);
    } else {
      pageContent.insertBefore(copyButton, pageContent.firstChild);
    }
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCopyMarkdown);
} else {
  initCopyMarkdown();
}

export { initCopyMarkdown };

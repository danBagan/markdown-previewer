const editor = document.getElementById('editor');
const preview = document.getElementById('preview');

function parseMarkdown(md) {
    let html = md;

    // Headers
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

    // Bold
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/__(.+?)__/g, '<strong>$1</strong>');

    // Italic
    html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
    html = html.replace(/_(.+?)_/g, '<em>$1</em>');

    // Code blocks
    html = html.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');

    // Inline code
    html = html.replace(/`(.+?)`/g, '<code>$1</code>');

    // Links
    html = html.replace(/\[([^\]]+)\]\(([^\)]+)\)/g, '<a href="$2" target="_blank">$1</a>');

    // Images
    html = html.replace(/!\[([^\]]*)\]\(([^\)]+)\)/g, '<img src="$2" alt="$1">');

    // Blockquotes
    html = html.replace(/^> (.+)/gim, '<blockquote>$1</blockquote>');

    // Horizontal rule
    html = html.replace(/^---$/gim, '<hr>');

    // Lists
    html = html.replace(/^\* (.+)/gim, '<ul><li>$1</li></ul>');
    html = html.replace(/^\- (.+)/gim, '<ul><li>$1</li></ul>');
    html = html.replace(/^\d+\. (.+)/gim, '<ol><li>$1</li></ol>');

    // Combine consecutive list items
    html = html.replace(/<\/ul>\n<ul>/g, '');
    html = html.replace(/<\/ol>\n<ol>/g, '');

    // Paragraphs
    html = html.replace(/\n\n/g, '</p><p>');
    html = '<p>' + html + '</p>';

    // Clean up empty paragraphs
    html = html.replace(/<p><\/p>/g, '');
    html = html.replace(/<p>(<h[1-6]>)/g, '$1');
    html = html.replace(/(<\/h[1-6]>)<\/p>/g, '$1');
    html = html.replace(/<p>(<ul>)/g, '$1');
    html = html.replace(/(<\/ul>)<\/p>/g, '$1');
    html = html.replace(/<p>(<ol>)/g, '$1');
    html = html.replace(/(<\/ol>)<\/p>/g, '$1');
    html = html.replace(/<p>(<pre>)/g, '$1');
    html = html.replace(/(<\/pre>)<\/p>/g, '$1');
    html = html.replace(/<p>(<blockquote>)/g, '$1');
    html = html.replace(/(<\/blockquote>)<\/p>/g, '$1');
    html = html.replace(/<p>(<hr>)<\/p>/g, '$1');

    return html;
}

function updatePreview() {
    const markdown = editor.value;
    preview.innerHTML = parseMarkdown(markdown);
}

editor.addEventListener('input', updatePreview);

// Initial render
updatePreview();

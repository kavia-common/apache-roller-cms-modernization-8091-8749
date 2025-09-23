export default function DeveloperDocsPage() {
  return (
    <article className="prose max-w-none">
      <h1>Developer Documentation</h1>
      <p>Build themes and extend UI using the documented hooks and APIs.</p>
      <h2>API Clients</h2>
      <pre><code>import &#123; BlogAPI &#125; from &quot;@/lib/api&quot;;</code></pre>
      <h2>Theming</h2>
      <p>Access theme state with <code>useThemeSettings()</code> and update settings using CSS variables.</p>
      <h2>Extensibility Hooks</h2>
      <ul>
        <li>Toaster: <code>useToaster().push({ message, type })</code> for notifications</li>
        <li>Theme: <code>useThemeSettings().setSettings</code> for live preview</li>
      </ul>
    </article>
  );
}

import Layout from '../components/Layout';

export default function TermsPage() {
  return (
    <Layout>
      <div className="card">
        <h1>Terms of Service</h1>
        <p className="meta" style={{ margin: '0 0 22px', color: 'var(--muted)', fontSize: '0.95rem' }}>
          <strong>Effective Date:</strong> February 2, 2026<br />
          <strong>Operated by:</strong> Blackjax, LLC<br />
          <strong>Contact:</strong> <a href="mailto:contact@blackjaxstudio.com">contact@blackjaxstudio.com</a><br />
          <strong>GitHub:</strong> <a href="https://github.com/Blackjax-Studio/whats-for-dinner" target="_blank" rel="noopener noreferrer">https://github.com/Blackjax-Studio/whats-for-dinner</a>
        </p>

        <div className="notice" style={{ borderLeft: '4px solid var(--warn)', background: '#fffbeb', padding: '14px 14px', borderRadius: '12px', margin: '18px 0 22px', color: '#92400e' }}>
          <b>1. Acceptance of Terms</b><br />
          By using What's for Dinner through ChatGPT, you agree to these Terms. If you don't agree, don't use the App.
        </div>

        <h2>2. Eligibility</h2>
        <p>
          You must be able to form a binding contract. If using on behalf of an organization, you must have authority to bind them.
        </p>

        <h2>3. What the App Does</h2>
        <p>
          What's for Dinner is an MCP server built exclusively for ChatGPT. It randomly selects meals from:
        </p>
        <ul>
          <li>Internal database of meal options, OR</li>
          <li>Custom lists you provide or ChatGPT generates</li>
        </ul>
        <p>
          Shows interactive spinning widget with action buttons (Get Recipes, Get Restaurants, Get Directions, Spin Again). Requires <code>window.openai</code> object to function properly.
        </p>

        <h2>4. Relationship with OpenAI/ChatGPT</h2>
        <p>
          The App operates within ChatGPT (an OpenAI product). You must also comply with OpenAI's Terms of Use. We are <strong>NOT</strong> affiliated with, endorsed by, or sponsored by OpenAI. Data transmission between ChatGPT and our App is governed by OpenAI's policies. Review OpenAI's terms at: <a href="https://openai.com/policies" target="_blank" rel="noopener noreferrer">https://openai.com/policies</a>
        </p>

        <h2>5. Food, Dietary & Safety Disclaimers</h2>
        <p><strong>IMPORTANT: This is for entertainment/convenience only.</strong></p>
        <ul>
          <li>The App does <strong>NOT</strong> know your allergies, dietary restrictions, or medical conditions.</li>
          <li>Suggestions may be incomplete or inaccurate.</li>
          <li><strong>Allergens:</strong> Always verify ingredients from authoritative sources.</li>
          <li><strong>Food Safety:</strong> Follow proper food handling and cooking practices.</li>
          <li><strong>Not Medical Advice:</strong> Nothing here is nutritional or medical advice.</li>
          <li><strong>Restaurants:</strong> Verify hours, menus, and locations independently.</li>
          <li>You assume all risk for decisions based on App suggestions.</li>
        </ul>

        <h2>6. Privacy & Data Collection</h2>
        <p>We collect <strong>ZERO</strong> personal data:</p>
        <ul>
          <li>No user accounts</li>
          <li>No tracking or analytics</li>
          <li>No conversation history stored</li>
          <li>No meal preferences saved</li>
          <li>No sale of information</li>
          <li>No database of your queries</li>
        </ul>
        <p><strong>Data Transmission:</strong></p>
        <ul>
          <li>ChatGPT sends your requests to our server to process selections.</li>
          <li>Our server processes requests transiently (in memory only).</li>
          <li>We do <strong>NOT</strong> log or store personal information.</li>
          <li>ChatGPT may include data in API calls per OpenAI's practices (not ours). Review ChatGPT's Privacy Policy for what they may store.</li>
        </ul>

        <h2>7. Pricing</h2>
        <p>
          Currently 100% <strong>FREE</strong>. We reserve the right to add paid features or premium tiers in the future. You'll receive notice if paid features are introduced. Free features will remain free.
        </p>

        <h2>8. Acceptable Use</h2>
        <p>You agree <strong>NOT</strong> to:</p>
        <ul>
          <li>Disrupt, overload, hack, or reverse engineer the service</li>
          <li>Generate illegal, harmful, or offensive content</li>
          <li>Probe or test system vulnerabilities</li>
          <li>Use bots or automation to make excessive requests</li>
          <li>Bypass security measures</li>
          <li>Impersonate others</li>
        </ul>
        <p>We can suspend or terminate access for violations.</p>

        <h2>9. Open Source License</h2>
        <p>
          Source code available at: <a href="https://github.com/Blackjax-Studio/whats-for-dinner" target="_blank" rel="noopener noreferrer">https://github.com/Blackjax-Studio/whats-for-dinner</a>. Code is governed by the license in the repository. If you self-host: You're responsible for your own deployment, security, and compliance. These Terms only apply to Blackjax, LLC's hosted version.
        </p>

        <h2>10. Intellectual Property</h2>
        <p>
          Blackjax, LLC retains rights to the "What's for Dinner" name, logos, and branding. Don't imply endorsement or affiliation without written permission. Open source license covers code, not trademarks.
        </p>

        <h2>11. Third-Party Services & Links</h2>
        <p>
          App may link to recipe sites, restaurant directories, maps, delivery services. These are <strong>NOT</strong> under our control. We're <strong>NOT</strong> responsible for their content, accuracy, or privacy practices. Use at your own risk.
        </p>

        <h2>12. Service Availability & Changes</h2>
        <p>We reserve the right to:</p>
        <ul>
          <li>Modify, suspend, or discontinue the App at any time</li>
          <li>Update meal database or functionality</li>
          <li>Implement rate limits or usage restrictions</li>
          <li>Block access to prevent abuse</li>
        </ul>
        <p>No guarantee of uninterrupted service.</p>

        <h2>13. Disclaimer of Warranties</h2>
        <p><strong>THE APP IS PROVIDED "AS IS" AND "AS AVAILABLE"</strong></p>
        <p><strong>NO WARRANTIES OF ANY KIND</strong>, including:</p>
        <ul>
          <li>Merchantability or fitness for particular purpose</li>
          <li>Uninterrupted, error-free, or secure operation</li>
          <li>Accuracy or reliability of suggestions</li>
          <li>Non-infringement</li>
        </ul>

        <h2>14. Limitation of Liability</h2>
        <p><strong>BLACKJAX, LLC IS NOT LIABLE FOR:</strong></p>
        <ul>
          <li>Indirect, incidental, special, or consequential damages</li>
          <li>Loss of profits, data, or goodwill</li>
          <li>Damages from your use or inability to use the App</li>
          <li>Food-related decisions, allergic reactions, or foodborne illness</li>
          <li>Third-party services or content</li>
        </ul>
        <p><strong>MAXIMUM LIABILITY:</strong> Greater of $10 USD or amount you paid (if any) in last 12 months. Some jurisdictions don't allow liability exclusions; limitations apply to maximum extent permitted by law.</p>

        <h2>15. Indemnification</h2>
        <p>You agree to indemnify and hold harmless Blackjax, LLC from claims arising from:</p>
        <ul>
          <li>Your use or misuse of the App</li>
          <li>Your violation of these Terms</li>
          <li>Your violation of laws or third-party rights</li>
          <li>Food-related decisions you make</li>
          <li>Your interactions with third-party services</li>
        </ul>

        <h2>16. Copyright & DMCA</h2>
        <p>To report copyright infringement, email <a href="mailto:contact@blackjaxstudio.com">contact@blackjaxstudio.com</a> with:</p>
        <ul>
          <li>Identification of copyrighted work</li>
          <li>Identification of infringing material and its location</li>
          <li>Your contact information</li>
          <li>Statement of good faith belief use is unauthorized</li>
          <li>Statement that information is accurate</li>
          <li>Your physical or electronic signature</li>
        </ul>

        <h2>17. Governing Law & Disputes</h2>
        <ul>
          <li><strong>Governed by:</strong> Missouri state law</li>
          <li><strong>Venue:</strong> State or federal courts in Missouri</li>
          <li><strong>Informal Resolution:</strong> Contact us at <a href="mailto:contact@blackjaxstudio.com">contact@blackjaxstudio.com</a> before filing legal claims</li>
        </ul>

        <h2>18. Changes to Terms</h2>
        <ul>
          <li>We may update these Terms at any time</li>
          <li>"Last updated" date will be revised</li>
          <li>Material changes will be communicated through the App or email</li>
          <li>Continued use = acceptance of updated Terms</li>
          <li>If you don't agree, stop using the App</li>
        </ul>

        <h2>19. Severability</h2>
        <p>Invalid provisions will be modified to minimum extent necessary. Remaining provisions stay in effect.</p>

        <h2>20. Waiver</h2>
        <p>Our failure to enforce doesn't waive our rights. Waivers must be in writing.</p>

        <h2>21. Entire Agreement</h2>
        <p>These Terms are the complete agreement. Supersede all prior communications or agreements.</p>

        <h2>22. Contact</h2>
        <p>
          <strong>Blackjax, LLC</strong><br />
          <strong>Email:</strong> <a href="mailto:contact@blackjaxstudio.com">contact@blackjaxstudio.com</a><br />
          <strong>GitHub:</strong> <a href="https://github.com/Blackjax-Studio/whats-for-dinner" target="_blank" rel="noopener noreferrer">https://github.com/Blackjax-Studio/whats-for-dinner</a>
        </p>
      </div>
    </Layout>
  );
}

# Responsible use of GitHub Copilot coding agent on GitHub.com

This guide explains how to use GitHub Copilot coding agent responsibly in this repository, including what the agent is good at, where it can fail, and how to review its output safely.

## What Copilot coding agent does

Copilot coding agent can pick up work from an issue, pull request comment, or Copilot Chat prompt, then:

- Create a pull request with proposed code or documentation changes
- Run in an ephemeral environment to edit code and execute validations
- Iterate on the same PR after review feedback (`@copilot` comments)

It is best used for scoped, incremental tasks such as bug fixes, docs updates, maintenance, and focused feature additions.

## How it works at a high level

Copilot coding agent follows a prompt-to-change pipeline:

1. **Prompt processing**: your task and repository context are combined
2. **Model analysis**: a language model reasons about what to change
3. **Response generation**: code/documentation changes are produced
4. **PR updates**: PR description and follow-up revisions are posted

Because this process is probabilistic, outputs can be incomplete or incorrect. Human review is always required.

## Recommended usage in this repo

For best results, create well-scoped tasks with:

- A clear problem statement
- Explicit acceptance criteria (including test/build expectations)
- Pointers to likely files or modules

Treat the agent as an accelerator, not a replacement for engineering ownership.

## Required review and validation practices

Before merging agent-authored changes:

- Review code correctness and architecture fit
- Run builds/tests relevant to changed areas
- Check for security issues and secret exposure
- Confirm behavior against acceptance criteria

Apply the same standards as any third-party contribution.

## Disable automatic code reviews in GitHub

If you want to turn off GitHub's automatic code review behavior for this
repository and request reviews manually instead:

1. Open the repository on GitHub and go to **Settings**.
2. In the current GitHub UI, first check **Settings** → **Rules** →
   **Rulesets** (or **Settings** → **Branches** for classic branch protection).
   If your repository is using repository-level review controls instead, also
   check **Settings** → **Moderation options** → **Code review limits**.
3. Find the automatic review option, such as **Enable automatic requested
   reviews**, and turn it off.
4. Save the repository settings change.

If you do not see the setting, verify that you have the required repository
permissions and that the feature is available on your current GitHub plan. For
the latest GitHub navigation details, see GitHub's repository settings and pull
request review documentation:

- https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/managing-repository-settings
- https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/managing-repository-settings/managing-pull-request-reviews-in-your-repository

## Security posture and safeguards

GitHub includes guardrails, but they are not a substitute for review:

- Agent interactions require repository write access
- Agent branch permissions are constrained (no direct default-branch pushes)
- Runtime access is limited to the target repository
- Firewall controls help reduce data exfiltration risk
- Generated changes are scanned (for example: CodeQL, secret scanning, dependency advisories)

Even with these protections, maintain secure coding and code review practices in every PR.

## Known limitations to account for

Copilot coding agent may:

- Miss project-specific intent or constraints
- Produce insecure or semantically incorrect code
- Reflect bias from training/context
- Suggest code that resembles public code

Always verify output quality, legal suitability, and security before merge.

## Continuous improvement

- Provide feedback on low-quality outputs to improve future performance
- Keep repository instructions current so the agent receives better context
- Revisit process and security practices as the tooling evolves

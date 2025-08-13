---
mode: 'agent'
model: GPT-4o
tools: ['githubRepo', 'codebase']
description: 'git commit and push'
---

* 現在の変更内容を確認してください。
* 意味のある粒度で分けて、変更内容をステージングしてください。
* ステージングしたら、git commitしてください。
* 最後にgit pushしてください。
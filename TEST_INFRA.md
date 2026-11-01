# E2E Test Infra: Mastered Language Coach Student Portal

## Test Philosophy
- Opaque-box, requirement-driven. Derived from `ORIGINAL_REQUEST.md` and user-facing specifications.
- Methodology: Category-Partition + Boundary Value Analysis (BVA) + Pairwise Combinatorial + Workload Testing across 4 Tiers.

## Feature Inventory
| # | Feature | Source (requirement) | Tier 1 | Tier 2 | Tier 3 |
|---|---------|---------------------|:------:|:------:|:------:|
| 1 | Clean End Call Lifecycle & Audio Teardown | ORIGINAL_REQUEST §R1 | 5 | 5 | ✓ |
| 2 | Speech Pipeline Timers & Watchdog Clearance | ORIGINAL_REQUEST §R1 | 5 | 5 | ✓ |
| 3 | Speaking Room Ready & Summary UI Transitions | ORIGINAL_REQUEST §R1 | 5 | 5 | ✓ |
| 4 | End Call Progress Persistence to Backend | ORIGINAL_REQUEST §R2, R3 | 5 | 5 | ✓ |
| 5 | Cross-Device & Multi-Viewport Sync | ORIGINAL_REQUEST §R2 | 5 | 5 | ✓ |
| 6 | Admin Portal Progress & History Reflection | ORIGINAL_REQUEST §R2 | 5 | 5 | ✓ |
| 7 | Permanent Google Sheets Backend Storage | ORIGINAL_REQUEST §R3 | 5 | 5 | ✓ |
| 8 | Safe Isolated Test Record Partitioning | ORIGINAL_REQUEST §R3 | 5 | 5 | ✓ |

## Test Architecture
- Test runner: Node.js / Puppeteer automated test runner (`scratch/test_e2e_suite.cjs`).
- Invocation: `node scratch/test_e2e_suite.cjs`
- Pass/fail semantics: Exit code 0 if all tests pass; non-zero on any failure.
- Directory layout:
  - `scratch/`: contains test scripts, fixtures, and headless runner configs.

## Real-World Application Scenarios (Tier 4)
| # | Scenario | Features Exercised | Complexity |
|---|----------|--------------------|------------|
| 1 | Full Student Call Session, End Call, and Ready Return | F1, F2, F3, F4 | Medium |
| 2 | Mobile Practice Session to Desktop Login Continuity | F4, F5, F7, F8 | High |
| 3 | End Call with Instant Admin Portal Live Reflection | F4, F5, F6, F7 | High |
| 4 | Google Sheets Deep Monotonic Merge with Isolated Probes | F7, F8 | High |
| 5 | Complete Multi-Device Speaking + Admin Audit Workflow | F1, F2, F3, F4, F5, F6, F7, F8 | High |

## Coverage Thresholds
- Tier 1 (Feature Coverage): ≥5 per feature (8 features × 5 = 40 checks)
- Tier 2 (Boundary & Corner Cases): ≥5 per feature (8 features × 5 = 40 checks)
- Tier 3 (Cross-Feature Combinations): ≥8 cross-feature interaction scenarios
- Tier 4 (Real-World Application Scenarios): 5 comprehensive end-to-end workflows
- Total: 93 automated verification assertions

export default `An AI summary can sound confident, orderly and complete while changing a number, attaching an action to the wrong person or dropping the exception that makes a statement accurate. Verification is therefore not a final spell-check. It is a structured comparison between the generated text and the source.

Use the [AI Text Summarizer](/ai-text-summarizer) to create a draft overview or the [AI Study Notes Generator](/ai-study-notes-generator) to organise supplied learning material. Neither tool browses for evidence or certifies the result. Keep the original text open and treat every generated sentence as a claim to review.

## Define what the summary is supposed to preserve

Before generating, write down the intended audience and purpose. A two-sentence briefing, revision notes and meeting actions preserve different details. Without a target, a reviewer cannot tell whether a missing paragraph is harmless compression or a serious omission.

Mark the source information that must survive shortening: names and roles, dates, quantities, units, conditions, deadlines, negation, uncertainty, citations and decisions. For a policy, include eligibility and exceptions. For an experiment, include what was measured and the important limitations. For meeting notes, include who agreed to do what and by when.

Do not ask for a short output and silently expect every detail. If the source contains several independent decisions, request a structured summary with a section for each one. Supply the complete relevant passage rather than disconnected quotations; surrounding text may reverse or qualify a claim.

## Separate faithfulness from truth

A faithful summary accurately represents its supplied source. That does not prove the source is correct. If a source says a trial starts on 1 October, a faithful summary should not change the date. But confirming whether the organisation really announced that trial requires separate evidence.

This distinction prevents two common mistakes. First, background knowledge should not be inserted and presented as though it came from the passage. Second, a faithful repetition of an outdated or unsupported claim should not be labelled fact-checked.

NIST's [Generative AI Profile](https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence) identifies confidently stated false content as a generative-AI risk and recommends reviewing and verifying sources and citations in outputs. Summarisation research also treats factual consistency as a separate problem: the ACL paper [Reducing Quantity Hallucinations in Abstractive Summarization](https://aclanthology.org/2020.findings-emnlp.203/) describes generated material that is unsupported by the original text. The practical response is source comparison, not confidence in fluent wording.

## Turn each important sentence into checkable claims

Review one summary sentence at a time. Split compound sentences into smaller claims. “The library will open until 8 pm every day from October” contains at least a closing time, a frequency and a start period. A source might actually say weekday hours will extend from 6 pm to 8 pm for a four-week trial beginning 1 October, while weekends stay unchanged.

Create a simple review table with four columns: summary claim, supporting source passage, status and correction. Use statuses such as supported, contradicted, not in source and unclear. Quote only enough of the source to locate the evidence; do not manufacture a citation that the source never provided.

Check these high-risk elements first:

1. Names, organisations and roles. Confirm that an action or opinion belongs to the right entity.
2. Numbers, currencies, percentages and units. A correct number with the wrong unit is still wrong.
3. Dates, duration and sequence. Watch for a proposal becoming a completed event.
4. Negation and scope. “Some,” “may” and “not recommended” must not become “all,” “will” and “recommended.”
5. Cause and correlation. Do not let an association become proof that one factor caused another.
6. Quotations and citations. Confirm exact wording and that the cited source supports the nearby claim.

## Look for omissions, not only invented details

Sentence-by-sentence checking can find unsupported additions but miss important source content that never appears in the summary. Review the source in the other direction: move section by section and ask whether its main point, exception or unresolved issue appears somewhere in the output.

Pay special attention to words such as but, except, unless, only, preliminary, estimated and subject to. These often introduce the qualification that a compressed summary drops. In a comparison, check that both advantages and limitations remain proportionate. In instructions, check prerequisites and warnings as well as the main action.

Omission risk changes with the use. Leaving a colourful example out of a one-paragraph overview may be reasonable. Leaving a contraindication out of health information, a termination clause out of a contract note or a submission deadline out of student instructions is not. High-stakes material needs review by someone qualified in that domain; this workflow is not professional medical, legal or financial validation.

## Check emphasis and certainty

A summary can contain individually supported sentences yet still mislead by giving a minor point most of the space. Compare the source's structure and repetition with the generated emphasis. Ask whether the summary turns speculation into a conclusion, a participant's view into the organisation's position or an example into a general rule.

Highlight modal and uncertainty language in both versions: may, might, could, likely, estimated, preliminary and confidence intervals. Preserve it unless the source itself resolves the uncertainty. Also check whether a neutral source has acquired promotional adjectives such as groundbreaking, guaranteed or best.

For study notes, compare definitions and relationships rather than memorising polished phrasing. A simplified definition can lose the condition that distinguishes one concept from another. Keep formulas with their variable meanings and units. If the notes introduce a term absent from the course material, flag it for verification instead of assuming it will be accepted in an exam.

## Use a text diff for revisions, not proof

After correcting a draft, the [Text Diff Checker](/text-diff-checker) can show which words changed between two similarly organised versions. It is useful for spotting a restored “not,” a corrected date or an altered unit. It does not know whether either version matches the source, and large rewrites can make a line-based diff noisy.

Keep a small audit trail for important work: source version or URL, access date, generated draft, corrections and final reviewer. If the source later changes, this record explains which version the summary represented. Do not store confidential source material in an inappropriate shared document merely to create an audit trail.

Asking an AI system to review its own answer may reveal candidates for checking, but agreement between two generated answers is not independent evidence. A model can repeat the same unsupported assumption. Return to the original passage or an authoritative external source.

## Run a final release checklist

Before sharing or studying from the summary, confirm that:

- every important claim has identifiable support in the source;
- names, dates, figures, units and relationships match;
- negation, uncertainty and conditions remain intact;
- no invented citation or quotation has appeared;
- essential exceptions, warnings and action items are present;
- the level of detail suits the stated purpose and audience;
- external facts have been separately verified where truth, not just faithfulness, matters;
- sensitive text was handled according to your organisation's rules.

The Huzaifa AI tools send submitted text to the configured AI service and require sign-in and service availability. Do not paste private records, unreleased work, credentials or material you lack permission to share. The [Privacy Policy](/privacy-policy) provides the site's broader data-handling context.

## Treat the output as an editable map

A useful summary helps a reader return to the right parts of the source; it does not make the source unnecessary. Generate from complete, permitted material, verify at claim level, scan for omissions and keep uncertainty visible. For a strict length requirement, use the [Word Counter](/word-counter) only after accuracy is settled—cutting the text first can remove the very qualification that makes it trustworthy.
`;

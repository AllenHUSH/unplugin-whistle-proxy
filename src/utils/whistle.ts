interface SetRuleOptions {
  uiport: string | number
  ruleKey: string
  ruleValue: string
}

export function setRule({
  uiport,
  ruleKey,
  ruleValue,
}: SetRuleOptions): void {
  fetch(`http://localhost:${uiport}/cgi-bin/rules/select`, {
    headers: {
      'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
    },
    body: `name=${ruleKey}&value=${encodeURIComponent(ruleValue)}`,
    method: 'POST',
  })
}

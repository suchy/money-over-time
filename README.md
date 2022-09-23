# Money over time - finances modeling tool - proof of concept

Money over time is an idea to model / plan finances in context of time.

## The goal

Whole point of that idea is to allow user to predict her / his finances in any point of time and answer this kind of questions:

- How much money I will have on my accounts in the end of month?
- Will my businnes have problem with cash flow if client will delay his payment?
- When I will reach given savings level?

## Key concepts

There are three key concepts: accounts, variables and events. All concepts are mimic the real world situations.

### Accoutns

Accoutns are values to track. Account balance will be modified by events. For example: salary will increase savings account balance but electricity bill will decrease it.

### Variables

Real world values, which might impact finances, e.g. tax rates, mortgage rate etc. Variables might be changed and used by events to change accouts balances.

### Events

Events represents any finance occurrence in real world. It might change variable value (law changes impact tax rates) or account balance (salary chnages savings account). Events could be repeated daily weekly, monthly etc.

## Current state

In current state of application user can:

- manage accounts
- manage events
- use formulas as events values (eg. 15% \* 1000)
- check on graph accounts balances for given date

This is just proof of concept and it is not certain if development will be continued.

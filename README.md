# Unicorn Contributor

Pressed to complete your GitHub profile green bar? Complete the bar in one second.

1. ```npm i -g unicorn-contributor```
2. Create a new repository in GitHub
3. ```git clone YOUR_REPO_GIT_URL```
4. ```cd YOUR_REPO_NAME```
5. ```unicorn-contributor```

# Options
```
unicorn-contributor
  --contributions 1000          # default 1000 (minimum 365, guess why)
  --only-weekends               # recruiters love geeks without social life
  --timezone "+1"               # change your timezone, defaults to GMT+0
  --crazy-hours 6-24            # pretend you code instead of watching Netflix every night
```


# Why did I do this?

In my opinion, none of the graphs/statistics provided by GitHub are useful.
If anything, they can be misleading. Those metrics are not an
accurate measurement of value, which is the only thing that matters.

Some real life examples that upset me enough to push me to create this:

* Recruiters looking at the GitHub green bar like if it accurately displayed the
quality of my potential work.

* Engineers judging other engineers just by looking at the GitHub profile.

* Managers or other engineers looking at the commit and line counts. These
metrics can be found for each Engineer and repository. Like if writing 1000 lines
actually added 1000 times the value. Sometimes, a simple dependency version
bump can improve performance and bring much more value.


# Disagree?

If you think that code metrics are useful for anything, please open an
issue to this repo, and if your argumentation is good enough I will even
consider removing the repository and the npm module.

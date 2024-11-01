setCrontab();

function setCrontab() {
  const wrapper = document.querySelector('.js-geoip-crontab');
  if (wrapper === null) {
    return;
  }
  // Saturday, Sunday, Monday
  const firstDay = (Math.floor(Math.random() * 3) + 6) % 7;
  // Wednesday, Thursday
  const secondDay = Math.floor(Math.random() * 2) + 3;

  const minute = Math.floor(Math.random() * 60);
  const hour = Math.floor(Math.random() * 24);
  const cronExpression = `${minute} ${hour} * * ${firstDay},${secondDay}`;

  replaceCrontab(wrapper, cronExpression);
  wrapper.classList.remove('hide');
}

function replaceCrontab(
  wrapper: HTMLElement | ChildNode | null,
  cronExpression: string
) {
  if (wrapper === null) {
    return;
  }

  const placeholder = '___js-cron-placeholder___';
  for (const child of wrapper.childNodes) {
    if (
      child.nodeType === Node.TEXT_NODE &&
      child.textContent?.includes(placeholder)
    ) {
      child.textContent = child.textContent?.replace(
        placeholder,
        cronExpression
      );
      return;
    } else if (child.childNodes.length > 0) {
      replaceCrontab(child, cronExpression);
    }
  }
}

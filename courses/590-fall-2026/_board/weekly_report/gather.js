// Run in a logged-in Canvas tab (canvas.illinois.edu). Returns the week's raw data as JSON for build.py.
(async () => {
  const C = 75598;
  const g = async u => { const r = await fetch(u); if (!r.ok) return null; return JSON.parse((await r.text()).replace(/^while\(1\);/, '')); };
  const enr = await g(`/api/v1/courses/${C}/enrollments?type[]=StudentEnrollment&per_page=100`);
  const summ = (await g(`/api/v1/courses/${C}/analytics/student_summaries?per_page=100`)) || [];
  const sv = Object.fromEntries(summ.map(s => [s.id, s]));
  const students = enr.map(e => [e.user.sortable_name, e.last_activity_at, (sv[e.user_id] || {}).page_views || 0, Math.round((e.total_activity_time || 0) / 60)])
    .sort((a, b) => a[0].localeCompare(b[0]));
  const assignments = [];
  for (const a of await g(`/api/v1/courses/${C}/assignments?per_page=50&order_by=due_at`)) {
    const s = a.published ? await g(`/api/v1/courses/${C}/assignments/${a.id}/submission_summary`) : null;
    assignments.push([a.name, a.due_at, a.published, s ? s.graded + s.ungraded : null, a.needs_grading_count || 0]);
  }
  const modules = (await g(`/api/v1/courses/${C}/modules?per_page=50&include[]=items`))
    .map(m => [m.name, m.published, m.items.filter(i => i.published).length, m.items.length]);
  const anns = (await g(`/api/v1/courses/${C}/discussion_topics?only_announcements=true&per_page=50`)).map(a => [a.title, a.posted_at]);
  return JSON.stringify({ generated: new Date().toISOString(), students, assignments, modules, anns });
})();

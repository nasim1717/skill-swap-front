export default function StatesSection() {
  const stats = [
    { number: "10K+", label: "Active Users" },
    { number: "500+", label: "Skills Categories" },
    { number: "25K+", label: "Successful Matches" },
    { number: "98%", label: "Satisfaction Rate" },
  ];
  return (
    <section className="py-16 bg-card">
      <div className="container">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl font-bold text-primary lg:text-4xl">{stat.number}</div>
              <div className="text-sm text-muted-foreground lg:text-base">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

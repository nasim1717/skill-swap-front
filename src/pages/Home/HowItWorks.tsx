export default function HowItWorks() {
  return (
    <section className="py-20 bg-card">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">How It Works</h2>
          <p className="text-lg text-muted-foreground">Get started in just three simple steps</p>
        </div>
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground text-2xl font-bold mb-6">
              1
            </div>
            <h3 className="text-xl font-semibold mb-4">Create Your Profile</h3>
            <p className="text-muted-foreground">
              Sign up and list the skills you can teach and the skills you want to learn.
            </p>
          </div>
          <div className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground text-2xl font-bold mb-6">
              2
            </div>
            <h3 className="text-xl font-semibold mb-4">Find Your Match</h3>
            <p className="text-muted-foreground">
              Our algorithm connects you with people who have complementary skills.
            </p>
          </div>
          <div className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground text-2xl font-bold mb-6">
              3
            </div>
            <h3 className="text-xl font-semibold mb-4">Start Learning</h3>
            <p className="text-muted-foreground">
              Connect, chat, and begin your skill exchange journey together.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

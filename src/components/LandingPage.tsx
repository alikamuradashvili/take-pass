import { motion } from "framer-motion";
import { Package, Truck, Search, ArrowRight, Shield, MapPin, Clock, DollarSign, Users, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" },
  }),
};

const HeroSection = () => (
  <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
    {/* Background glow */}
    <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
    
    <div className="container relative z-10 py-20">
      <motion.div
        initial="hidden"
        animate="visible"
        className="max-w-3xl mx-auto text-center"
      >
        <motion.div custom={0} variants={fadeUp} className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-1.5 mb-8">
          <span className="h-2 w-2 rounded-full bg-success animate-pulse-glow" />
          <span className="text-xs font-medium text-muted-foreground">საქართველოს ტვირთბაზარი — ახლა ხელმისაწვდომია</span>
        </motion.div>

        <motion.h1 custom={1} variants={fadeUp} className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold leading-tight tracking-tight mb-6">
          ტვირთის გადაზიდვა{" "}
          <span className="text-gradient">სწრაფად და მარტივად</span>
        </motion.h1>

        <motion.p custom={2} variants={fadeUp} className="text-lg text-muted-foreground max-w-xl mx-auto mb-10">
          შეაერთეთ ტვირთები და ტრანსპორტი ერთ პლატფორმაზე. გამოაქვეყნეთ განცხადება, მოძებნეთ მარშრუტი, დაიწყეთ თანამშრომლობა.
        </motion.p>

        <motion.div custom={3} variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" className="gap-2 px-8 text-base font-semibold">
            <Package className="h-5 w-5" />
            ტვირთის დამატება
          </Button>
          <Button size="lg" variant="outline" className="gap-2 px-8 text-base font-semibold border-border text-foreground hover:bg-secondary">
            <Truck className="h-5 w-5" />
            ტრანსპორტის დამატება
          </Button>
        </motion.div>
      </motion.div>
    </div>
  </section>
);

const features = [
  { icon: Package, title: "ტვირთის განცხადებები", desc: "გამოაქვეყნეთ ტვირთი: ტიპი, წონა, ზომა, მარშრუტი, ფასი" },
  { icon: Truck, title: "ტრანსპორტის განცხადებები", desc: "მიუთითეთ მანქანა, ტევადობა, მარშრუტი და ფასი კმ-ზე" },
  { icon: Search, title: "ძებნა და ფილტრები", desc: "მოძებნეთ მარშრუტით, რეგიონით, თარიღით, ტიპით და ფასით" },
  { icon: MapPin, title: "მარშრუტის პრევიუ", desc: "ნახეთ სავარაუდო მანძილი და ტრანსპორტირების ღირებულება" },
  { icon: Shield, title: "ვერიფიკაცია", desc: "მომხმარებლების და კომპანიების გადამოწმება და რეიტინგი" },
  { icon: Clock, title: "სწრაფი კომუნიკაცია", desc: "მოთხოვნა, მოლაპარაკება და ბუქინგი ერთ სისტემაში" },
];

const FeaturesSection = () => (
  <section id="features" className="py-24">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-4">
          პლატფორმის <span className="text-primary">შესაძლებლობები</span>
        </h2>
        <p className="text-muted-foreground max-w-lg mx-auto">
          ყველაფერი, რაც ტვირთების და ტრანსპორტის მართვისთვის გჭირდებათ
        </p>
      </motion.div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="group rounded-xl border border-border bg-card p-6 card-hover"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <f.icon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-heading text-lg font-semibold mb-2">{f.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const steps = [
  { num: "01", title: "დარეგისტრირდით", desc: "შექმენით პროფილი — მომხმარებელი ან გადამზიდავი" },
  { num: "02", title: "გამოაქვეყნეთ", desc: "დაამატეთ ტვირთი ან ტრანსპორტის განცხადება" },
  { num: "03", title: "მოძებნეთ", desc: "გაფილტრეთ მარშრუტით, ფასით, თარიღით" },
  { num: "04", title: "დაიწყეთ მუშაობა", desc: "დაუკავშირდით, მოილაპარაკეთ, დაჯავშნეთ" },
];

const HowItWorksSection = () => (
  <section id="how-it-works" className="py-24 bg-secondary/30">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-4">
          როგორ <span className="text-primary">მუშაობს</span>
        </h2>
      </motion.div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, i) => (
          <motion.div
            key={s.num}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center"
          >
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20">
              <span className="font-heading text-2xl font-bold text-primary">{s.num}</span>
            </div>
            <h3 className="font-heading text-lg font-semibold mb-2">{s.title}</h3>
            <p className="text-sm text-muted-foreground">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const stats = [
  { icon: Users, value: "2,500+", label: "აქტიური მომხმარებელი" },
  { icon: Package, value: "12,000+", label: "ტვირთის განცხადება" },
  { icon: Truck, value: "8,000+", label: "ტრანსპორტი" },
  { icon: TrendingUp, value: "95%", label: "წარმატებული გარიგება" },
];

const StatsSection = () => (
  <section id="stats" className="py-24">
    <div className="container">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="rounded-xl border border-border bg-card p-6 text-center glow-border"
          >
            <s.icon className="h-8 w-8 text-primary mx-auto mb-3" />
            <div className="font-heading text-3xl font-bold mb-1">{s.value}</div>
            <div className="text-sm text-muted-foreground">{s.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const CTASection = () => (
  <section className="py-24">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative rounded-2xl border border-border bg-card p-10 sm:p-16 text-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 pointer-events-none" />
        <div className="relative z-10">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-4">
            მზად ხართ <span className="text-primary">დასაწყებად</span>?
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto mb-8">
            შეუერთდით საქართველოს ყველაზე სწრაფ ტვირთბაზარს. უფასო რეგისტრაცია.
          </p>
          <Button size="lg" className="gap-2 px-10 text-base font-semibold">
            დაიწყეთ ახლა
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </motion.div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="border-t border-border py-10">
    <div className="container flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
          <Truck className="h-4 w-4 text-primary-foreground" />
        </div>
        <span className="font-heading text-lg font-bold">Take<span className="text-primary">Pass</span></span>
      </div>
      <p className="text-xs text-muted-foreground">© 2026 TakePass. ყველა უფლება დაცულია.</p>
      <div className="flex gap-4 text-xs text-muted-foreground">
        <span>GE</span>
        <span className="opacity-50">EN</span>
        <span className="opacity-50">RU</span>
      </div>
    </div>
  </footer>
);

const LandingPage = () => (
  <>
    <HeroSection />
    <FeaturesSection />
    <HowItWorksSection />
    <StatsSection />
    <CTASection />
    <Footer />
  </>
);

export default LandingPage;

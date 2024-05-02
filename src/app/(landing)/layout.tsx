function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style>{'html { scroll-snap-type: y mandatory; }'}</style>
      <div>{children}</div>
    </>
  );
}
export default LandingLayout;

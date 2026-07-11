import MobileNav from './MobileNav';
import DesktopNav from './DesktopNav';

function GNB() {
  return (
    <>
      <div className="block lg:hidden">
        <MobileNav />
      </div>
      <div className="hidden lg:block">
        <DesktopNav />
      </div>
    </>
  );
}

export default GNB;

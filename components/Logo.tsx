import Image from "next/image";

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export default function Logo({ className = "", showText = true }: LogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Logo Image */}
      <div className="relative flex-shrink-0">
        <Image
          src="/horizon logo.png"
          alt="Horizon Competition School Logo"
          width={200}
          height={60}
          className="h-auto w-auto max-h-16 object-contain"
          priority
        />
      </div>
    </div>
  );
}

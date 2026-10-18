import { MessageCircle, MonitorPlay } from 'lucide-react';

export default function Socials() {
  const socials = [
    {
      name: 'Discord',
      icon: <MessageCircle size={32} />,
      url: 'https://discord.gg/hm2qY7SKCg',
      color: '#5865F2'
    },
    {
      name: 'YouTube',
      icon: <MonitorPlay size={32} />,
      url: 'https://www.youtube.com/@bkidi',
      color: '#FF0000'
    }
  ];

  return (
    <div className="flex-1 flex items-center justify-center gap-8 p-8">
      {socials.map((social) => (
        <a
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className="relative flex flex-col items-center justify-center p-10 rounded-[14px] border transition-all duration-200 text-[#8995a1] hover:text-white group min-w-[180px]"
          style={{
            backgroundColor: 'rgba(17, 19, 27, 0.88)',
            borderColor: 'rgb(31, 34, 44)',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.02)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = social.color;
            e.currentTarget.style.boxShadow = `0 0 24px ${social.color}35, 0 4px 16px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05)`;
            e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)';
            e.currentTarget.style.backgroundColor = 'rgba(20, 22, 31, 0.92)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgb(31, 34, 44)';
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.02)';
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.backgroundColor = 'rgba(17, 19, 27, 0.88)';
          }}
        >
          <div className="transform transition-all duration-200 group-hover:scale-110 mb-4">
            {social.icon}
          </div>
          <span className="font-semibold text-lg">{social.name}</span>
        </a>
      ))}
    </div>
  );
}

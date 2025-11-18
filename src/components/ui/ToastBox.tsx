type ToastProps = {
  title: string;
  description?: string;
};

const ToastBox: React.FC<ToastProps> = ({ title, description }) => (
  <div className="bg-neutral-900 text-white p-4 rounded-xl">
    <h1 className="font-semibold">{title}</h1>
    {description && <p className="text-sm">{description}</p>}
  </div>
);

export default ToastBox;

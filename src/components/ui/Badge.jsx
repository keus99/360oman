const categoryColors = {
  'Visas & residency': 'bg-purple-100 text-purple-700',
  'Driving & transport': 'bg-blue-100 text-blue-700',
  'Banking & money': 'bg-green-100 text-green-700',
  Healthcare: 'bg-red-100 text-red-700',
  'Housing & utilities': 'bg-orange-100 text-orange-700',
  'Government services': 'bg-indigo-100 text-indigo-700',
  Education: 'bg-yellow-100 text-yellow-700',
  'Work & labour': 'bg-gray-100 text-gray-700',
  Lifestyle: 'bg-pink-100 text-pink-700',
  Medical: 'bg-red-100 text-red-700',
  'Legal & Finance': 'bg-indigo-100 text-indigo-700',
  'Home Services': 'bg-orange-100 text-orange-700',
  'Food & Grocery': 'bg-green-100 text-green-700',
  Automotive: 'bg-blue-100 text-blue-700',
  Hospitality: 'bg-purple-100 text-purple-700',
  'Fitness & Wellness': 'bg-pink-100 text-pink-700',
  Arrival: 'bg-teal-100 text-teal-700',
  Visas: 'bg-purple-100 text-purple-700',
  Driving: 'bg-blue-100 text-blue-700',
  Banking: 'bg-green-100 text-green-700',
  Housing: 'bg-orange-100 text-orange-700',
}

export default function Badge({ label, variant = 'category' }) {
  if (variant === 'featured') {
    return (
      <span className="badge bg-gold-500 text-white">Featured</span>
    )
  }
  const colorClass = categoryColors[label] || 'bg-gray-100 text-gray-700'
  return (
    <span className={`badge ${colorClass}`}>{label}</span>
  )
}

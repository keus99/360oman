import { Phone, Globe, MapPin, ExternalLink } from 'lucide-react'
import Badge from '../ui/Badge'

export default function BusinessCard({ business }) {
  return (
    <div className="card p-5">
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex flex-wrap gap-1.5">
          <Badge label={business.category} />
          {business.is_featured && <Badge label="Featured" variant="featured" />}
        </div>
        {business.area && (
          <span className="flex items-center gap-1 text-xs text-gray-400 shrink-0">
            <MapPin className="h-3 w-3" />
            {business.area}
          </span>
        )}
      </div>

      <h3 className="font-semibold text-navy mt-2">{business.name}</h3>
      {business.subcategory && (
        <p className="text-xs text-gray-400 mt-0.5">{business.subcategory}</p>
      )}
      {business.description && (
        <p className="text-sm text-gray-500 mt-2 line-clamp-2">{business.description}</p>
      )}
      {business.address && (
        <p className="text-xs text-gray-400 mt-2">{business.address}</p>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        {business.phone && (
          <a
            href={`tel:${business.phone}`}
            className="flex items-center gap-1.5 text-sm text-teal-600 hover:text-teal-700 font-medium"
          >
            <Phone className="h-3.5 w-3.5" />
            {business.phone}
          </a>
        )}
        {business.website && (
          <a
            href={business.website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-sm text-teal-600 hover:text-teal-700"
          >
            <Globe className="h-3.5 w-3.5" />
            Website
            <ExternalLink className="h-3 w-3" />
          </a>
        )}
        {business.google_maps_url && (
          <a
            href={business.google_maps_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
          >
            <MapPin className="h-3.5 w-3.5" />
            Map
            <ExternalLink className="h-3 w-3" />
          </a>
        )}
      </div>
    </div>
  )
}

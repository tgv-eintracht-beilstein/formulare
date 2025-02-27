import React from 'react';
import { useFormStore } from '../store';

export const PersonalInfo: React.FC = () => {
  const { formData, updateFormData } = useFormStore();

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Vor- &amp; Nachname
        </label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) => updateFormData({ name: e.target.value }, true)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Bitte Vor- &amp; Nachname eingeben"
          required
        />
      </div>
      <div>
        <label htmlFor="divison" className="block text-sm font-medium text-gray-700">
          Abteilung
        </label>
        <select
          id="division"
          value={formData.divison}
          onChange={(e) => updateFormData({ divison: e.target.value }, true)}
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          style={{ backgroundColor: 'white' }}
          required
        >
          <option value="fussball">Fussball</option>
          <option value="gesang">Gesang</option>
          <option value="tischtennis">Tischtennis</option>
          <option value="handball">Handball</option>
          <option value="schwimmen">Schwimmen</option>
          <option value="tennis">Tennis</option>
          <option value="ski-und-berg">Ski & Berg</option>
          <option value="turnen">Turnen</option>
        </select>
      </div>
      <hr />
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Geburtstag
        </label>
        <input
          type="date"
          id="birthday"
          value={formData.birthday}
          onChange={(e) => updateFormData({ birthday: e.target.value }, true)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div>
        <label htmlFor="zip" className="block text-sm font-medium text-gray-700">
          PLZ
        </label>
        <input
          type="string"
          id="zip"
          value={formData.zip}
          onChange={(e) => updateFormData({ zip: e.target.value }, true)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="71717"
          required
        />
      </div>
      <div>
        <label htmlFor="city" className="block text-sm font-medium text-gray-700">
          Stadt
        </label>
        <input
          type="string"
          id="city"
          value={formData.city}
          onChange={(e) => updateFormData({ city: e.target.value }, true)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Beilstein"
          required
        />
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
          Telefon
        </label>
        <input
          type="string"
          id="phone"
          value={formData.phone}
          onChange={(e) => updateFormData({ phone: e.target.value }, true)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="070625753"
          required
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          E-Mail Adresse
        </label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={(e) => updateFormData({ email: e.target.value }, true)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="beispiel@tgveintrachtbeilstein.de"
          required
        />
      </div>
    </div>
  );
};
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useGetRoomByIdQuery,
  useUpdateRoomMutation,
  useDeleteRoomImageMutation,
  useAddRoomImagesMutation,
} from "../../../backend-routes/ownerroutes/room.js";
import { Toaster, toast } from "react-hot-toast";
import {
  Trash2,
  Upload,
  ArrowLeft,
  Info,
  IndianRupee,
  Image as ImageIcon,
  CheckCircle2,
} from "lucide-react";

/* ================= CONSTANTS ================= */
const FACILITIES = [
  "Food Included", "RO Water", "Kitchen",
  "AC", "Cooler", "Fan", "Geyser", "Heater", "Non-AC",
  "WiFi", "Power Backup",
  "Bed", "Study Table", "Refrigerator", "Washing Machine", "TV",
  "Laundry", "Daily Cleaning",
  "CCTV", "Parking",
];

const RULES = [
  "Keep clean", "No Loud Music", "No Outside Guests",
  "Visitors Not Allowed", "No Parties",
  "Follow Entry & Exit Timings",
  "Inform Before Late Entry",
  "Smoking Prohibited", "Alcohol Prohibited",
];

const GENDER_OPTIONS = ["Boys", "Girls", "Family", "Anyone"];
const FURNISHED_OPTIONS = ["Fully Furnished", "Semi Furnished", "Unfurnished"];

/* ================= MAIN COMPONENT ================= */
export default function EditRoomForm() {
  const { roomId } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, refetch } = useGetRoomByIdQuery(roomId);
  const [updateRoom, { isLoading: isUpdating, isSuccess }] =
    useUpdateRoomMutation();
  const [deleteImageAPI] = useDeleteRoomImageMutation();
  const [addImagesAPI] = useAddRoomImagesMutation();

  const [dirty, setDirty] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);

  // upload button loading state
  const [isUploading, setIsUploading] = useState(false);

  const [formData, setFormData] = useState({
    roomNumber: "",
    category: "Pg",
    price: "",
    rentperday: "",
    rentperNight: "",
    rentperhour: "",
    advancedmonth: "",
    allowedFor: "Anyone",
    furnishedType: "Unfurnished",
    facilities: [],
    rules: [],
  });

  /* ================= EFFECTS ================= */
  useEffect(() => {
    if (data?.room) {
      setFormData({
        ...data.room,
        facilities: data.room.facilities || [],
        rules: data.room.rules || [],
      });
      setDirty(false);
    }
  }, [data]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Room updated successfully");
      navigate(-1);
    }
  }, [isSuccess, navigate]);

  useEffect(() => {
    setDirty(true);
  }, [formData]);

  /* ================= HANDLERS ================= */
  const handleToggleArray = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(v => v !== value)
        : [...prev[field], value],
    }));
  };

  const handleUpdateRoom = async () => {
    try {
      await updateRoom({ id: roomId, data: formData }).unwrap();
    } catch (err) {
      toast.error(err?.data?.message || "Update failed");
    }
  };

  const handleAddImages = async () => {
    if (!selectedImages.length) return toast.error("Select images first");
    const fd = new FormData();
    fd.append("id", roomId);
    selectedImages.forEach(img => fd.append("roomImages", img));

    try {
      setIsUploading(true);
      await addImagesAPI(fd).unwrap();
      toast.success("Images uploaded");
      setSelectedImages([]);
      refetch();
    } catch {
      toast.error("Upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  /* ================= LOADING ================= */
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <div className="h-12 w-12 rounded-full border-4 border-slate-200 border-t-blue-600 animate-spin" />
      </div>
    );
  }

  /* ================= PRICE SUMMARY ================= */
  const priceSummary =
    formData.category === "Hotel"
      ? `₹${formData.rentperday || 0}/day · ₹${formData.rentperNight || 0}/night`
      : `₹${formData.price || 0}/month · Deposit ${formData.advancedmonth || 0} mo`;

  /* ================= UI ================= */
  return (
    <div className="min-h-screen bg-slate-50 pb-32">
      <Toaster position="top-right" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-10">
        {/* HEADER */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors"
            >
              <ArrowLeft size={18} />
              Back
            </button>
            <h1 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
              Edit Room{" "}
              <span className="text-blue-600">#{formData.roomNumber}</span>
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              {priceSummary}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span
              className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${
                formData.category === "Hotel"
                  ? "bg-purple-50 text-purple-700 ring-purple-200"
                  : "bg-blue-50 text-blue-700 ring-blue-200"
              }`}
            >
              {formData.category}
            </span>
            {dirty ? (
              <span className="hidden md:inline-flex items-center gap-2 text-xs font-medium text-amber-600">
                <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
                Unsaved changes
              </span>
            ) : (
              <span className="hidden md:inline-flex items-center gap-2 text-xs font-medium text-emerald-600">
                <CheckCircle2 size={14} />
                Saved
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* LEFT */}
          <div className="lg:col-span-2 space-y-6">
            {/* IMAGES */}
            <SectionCard title="Room Gallery" icon={<ImageIcon size={18} />}>
              <p className="text-xs text-slate-500">
                Showcase the best angles of the room. Use bright, clear photos for higher conversions.
              </p>
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {data.room.roomImages?.map((img, i) => (
                  <div
                    key={i}
                    className="group relative aspect-video overflow-hidden rounded-xl border border-slate-200 bg-slate-100"
                  >
                    <img
                      src={img}
                      alt=""
                      className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => {
                          if (confirm("Delete this image?")) {
                            deleteImageAPI({ id: roomId, imageurl: img })
                              .unwrap()
                              .then(refetch);
                          }
                        }}
                        className="inline-flex items-center justify-center rounded-full bg-red-600 p-2 text-white shadow-lg shadow-red-500/40 hover:bg-red-700 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}

                <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50/60 px-3 py-4 text-center text-slate-400 transition-colors hover:border-blue-500 hover:bg-blue-50/60 hover:text-blue-600">
                  <Upload size={22} />
                  <span className="text-xs font-semibold tracking-wide uppercase">
                    Add Images
                  </span>
                  <span className="text-[10px] text-slate-400">
                    JPG, PNG up to 5MB each
                  </span>
                  <input
                    type="file"
                    multiple
                    className="hidden"
                    onChange={e => setSelectedImages([...e.target.files])}
                  />
                </label>
              </div>

              {selectedImages.length > 0 && (
                <div className="mt-4 flex flex-col gap-3 rounded-lg border border-blue-100 bg-blue-50 px-3 py-3 text-sm text-blue-800 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex flex-col">
                    <span className="font-semibold">
                      {selectedImages.length} image
                      {selectedImages.length > 1 ? "s" : ""} selected
                    </span>
                    <span className="text-xs text-blue-700/80">
                      They will be added to the room gallery after upload.
                    </span>
                  </div>
                  <button
                    onClick={handleAddImages}
                    disabled={isUploading}
                    className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors"
                  >
                    {isUploading ? (
                      <>
                        <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Uploading...
                      </>
                    ) : (
                      "Upload"
                    )}
                  </button>
                </div>
              )}
            </SectionCard>

            {/* (Optional) Additional details section */}
            {/* <SectionCard title="Room Details" icon={<Info size={18} />}>
              ...
            </SectionCard> */}
          </div>

          {/* RIGHT */}
          <div className="space-y-6">
            {/* PRICING */}
            <SectionCard title="Pricing" icon={<IndianRupee size={16} />}>
              <p className="text-xs text-slate-500 mb-3">
                Set clear, competitive pricing. All amounts are in INR.
              </p>
              {formData.category === "Hotel" ? (
                <div className="space-y-4">
                  <Input
                    label="Day Rate"
                    placeholder="e.g. 1500"
                    value={formData.rentperday}
                    onChange={v => setFormData({ ...formData, rentperday: v })}
                  />
                  <Input
                    label="Night Rate"
                    placeholder="e.g. 1800"
                    value={formData.rentperNight}
                    onChange={v => setFormData({ ...formData, rentperNight: v })}
                  />
                  <Input
                    label="Hourly Rate"
                    placeholder="Optional"
                    value={formData.rentperhour}
                    onChange={v => setFormData({ ...formData, rentperhour: v })}
                  />
                </div>
              ) : (
                <div className="space-y-4">
                  <Input
                    label="Monthly Rent"
                    placeholder="e.g. 8000"
                    value={formData.price}
                    onChange={v => setFormData({ ...formData, price: v })}
                  />
                  <Input
                    label="Advance Deposit rupees "
                    placeholder="e.g. 2"
                    value={formData.advancedmonth}
                    onChange={v => setFormData({ ...formData, advancedmonth: v })}
                  />
                </div>
              )}
            </SectionCard>

            {/* PREFERENCES */}
            <SectionCard title="Preferences" icon={<Info size={16} />}>
              <div className="space-y-4">
                <Select
                  label="Suitable For"
                  value={formData.allowedFor}
                  options={GENDER_OPTIONS}
                  onChange={v => setFormData({ ...formData, allowedFor: v })}
                />
                <Select
                  label="Furnishing"
                  value={formData.furnishedType}
                  options={FURNISHED_OPTIONS}
                  onChange={v => setFormData({ ...formData, furnishedType: v })}
                />
              </div>
            </SectionCard>

            <CheckboxList
              title="Facilities"
              subtitle="Highlight what the tenant will get."
              items={FACILITIES}
              selected={formData.facilities}
              onToggle={v => handleToggleArray("facilities", v)}
            />

            <CheckboxList
              title="House Rules"
              subtitle="Set clear expectations for tenants."
              items={RULES}
              selected={formData.rules}
              onToggle={v => handleToggleArray("rules", v)}
            />
          </div>
        </div>
      </div>

      {/* FLOATING BAR */}
      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-slate-200 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/70">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2 text-xs">
            {dirty ? (
              <span className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-amber-700">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
                Unsaved changes
              </span>
            ) : (
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-emerald-700">
                <CheckCircle2 size={14} />
                All changes saved
              </span>
            )}
          </div>

          <div className="flex w-full justify-end gap-2 sm:w-auto">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              disabled={isUpdating || !dirty}
              onClick={handleUpdateRoom}
              className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300 transition-colors"
            >
              {isUpdating ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================= UI COMPONENTS ================= */
function SectionCard({ title, icon, children }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white/90 shadow-sm">
      <div className="flex items-center gap-2 border-b border-slate-100 px-5 py-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-blue-600">
          {icon}
        </div>
        <h2 className="text-sm font-semibold tracking-wide text-slate-800">
          {title}
        </h2>
      </div>
      <div className="px-5 py-4 space-y-3">
        {children}
      </div>
    </section>
  );
}

function Input({ label, value, onChange, placeholder }) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </label>
      <input
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-slate-200 bg-slate-50/60 px-3 py-2.5 text-sm text-slate-900 shadow-sm transition-all placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
      />
    </div>
  );
}

function Select({ label, value, options, onChange }) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </label>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full rounded-xl border border-slate-200 bg-slate-50/60 px-3 py-2.5 text-sm text-slate-900 shadow-sm transition-all focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
      >
        {options.map(o => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

function CheckboxList({ title, subtitle, items, selected, onToggle }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white/90 p-5">
      <div className="mb-3">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          {title}
        </h3>
        {subtitle && (
          <p className="mt-1 text-xs text-slate-400">
            {subtitle}
          </p>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {items.map(item => {
          const isActive = selected.includes(item);
          return (
            <button
              key={item}
              type="button"
              onClick={() => onToggle(item)}
              className={`inline-flex items-center rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
                isActive
                  ? "border-blue-200 bg-blue-50 text-blue-700 shadow-sm"
                  : "border-slate-200 bg-slate-50 text-slate-500 hover:bg-slate-100"
              }`}
            >
              {item}
            </button>
          );
        })}
      </div>
    </section>
  );
}

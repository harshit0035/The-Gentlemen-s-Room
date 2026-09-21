import React, { useEffect, useMemo, useRef, useState } from "react";
import { Check, ChevronLeft, ChevronRight, X } from "lucide-react";
import {
  services,
  barbers,
  demoDates,
  demoTimes,
} from "../data/content";

export default function BookingModal({
  open,
  onClose,
  initialService = null,
  initialBarber = null,
}) {
  const [step, setStep] = useState(1);
  const [selection, setSelection] = useState({
    service: null,
    barber: null,
    date: null,
    time: null,
    name: "",
    email: "",
    phone: "",
    request: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const dialogRef = useRef(null);

  /*
   * Reset the booking flow every time the modal opens.
   * If a service was selected from the service section,
   * start directly from the barber step.
   */
  useEffect(() => {
    if (!open) return;

    setStep(initialService ? 2 : 1);
    setSubmitted(false);

    setSelection({
      service: initialService || null,
      barber: initialBarber || null,
      date: null,
      time: null,
      name: "",
      email: "",
      phone: "",
      request: "",
    });
  }, [open, initialService, initialBarber]);

  /*
   * Accessibility:
   * - Escape closes modal
   * - Tab remains inside modal
   * - Body scrolling is disabled
   * - Focus returns to previous element after closing
   */
  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement;

    const timer = window.setTimeout(() => {
      dialogRef.current?.focus();
    }, 0);

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusables = dialogRef.current.querySelectorAll(
        'button:not([disabled]), input:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );

      if (!focusables.length) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";

      if (
        previouslyFocused &&
        typeof previouslyFocused.focus === "function"
      ) {
        previouslyFocused.focus();
      }
    };
  }, [open, onClose]);

  const currentService = useMemo(
    () => services.find((service) => service.name === selection.service),
    [selection.service]
  );

  const currentBarber = useMemo(
    () => barbers.find((barber) => barber.name === selection.barber),
    [selection.barber]
  );

  if (!open) return null;

  const validEmail = /\S+@\S+\.\S+/.test(selection.email);

  const canContinue =
    (step === 1 && Boolean(selection.service)) ||
    (step === 2 && Boolean(selection.barber)) ||
    (step === 3 &&
      Boolean(selection.date) &&
      Boolean(selection.time)) ||
    (step === 4 &&
      selection.name.trim() &&
      validEmail &&
      selection.phone.trim());

  const next = () => {
    if (!canContinue) return;

    if (step < 4) {
      setStep((current) => current + 1);
    }
  };

  const back = () => {
    if (step > 1) {
      setStep((current) => current - 1);
    }
  };

  const confirm = (event) => {
    event.preventDefault();

    if (!canContinue) return;

    setSubmitted(true);
  };

  const updateSelection = (key, value) => {
    setSelection((current) => ({
      ...current,
      [key]: value,
    }));
  };

  return (
    <div
      className="modal-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className="booking-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-title"
        ref={dialogRef}
        tabIndex={-1}
      >
        {/* HEADER */}
        <div className="booking-top">
          <div>
            <span className="eyebrow">
              THE GENTLEMEN&apos;S ROOM
            </span>

            <h2 id="booking-title">
              {submitted
                ? "Request received."
                : "Book your appointment."}
            </h2>
          </div>

          <button
            className="icon-btn"
            onClick={onClose}
            aria-label="Close booking"
            type="button"
          >
            <X size={20} />
          </button>
        </div>

        {/* BOOKING FLOW */}
        {!submitted ? (
          <>
            {/* STEP INDICATOR */}
            <div className="booking-steps">
              {["SERVICE", "BARBER", "DATE & TIME", "DETAILS"].map(
                (label, index) => {
                  const stepNumber = index + 1;
                  const isActive = step === stepNumber;
                  const isDone = stepNumber < step;

                  return (
                    <button
                      key={label}
                      type="button"
                      onClick={() => {
                        if (isDone) {
                          setStep(stepNumber);
                        }
                      }}
                      className={
                        isActive
                          ? "active"
                          : isDone
                            ? "done"
                            : ""
                      }
                      aria-current={
                        isActive ? "step" : undefined
                      }
                    >
                      <span>0{stepNumber}</span>
                      {label}
                    </button>
                  );
                }
              )}
            </div>

            {/* BODY */}
            <div className="booking-body">
              {/* STEP 1 — SERVICE */}
              {step === 1 && (
                <div className="booking-content">
                  <p className="booking-intro">
                    Choose your service.
                  </p>

                  <div className="choice-list">
                    {services.map((service) => {
                      const selected =
                        selection.service === service.name;

                      return (
                        <button
                          key={service.name}
                          type="button"
                          className={`choice ${selected ? "selected" : ""
                            }`}
                          onClick={() =>
                            updateSelection(
                              "service",
                              service.name
                            )
                          }
                        >
                          <span className="choice-radio">
                            {selected ? (
                              <Check size={14} />
                            ) : null}
                          </span>

                          <span>
                            <strong>{service.name}</strong>

                            <small>
                              {service.desc}
                            </small>
                          </span>

                          <b>£{service.price}</b>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 2 — BARBER */}
              {step === 2 && (
                <div className="booking-content">
                  <p className="booking-intro">
                    Choose your barber.
                  </p>

                  <div className="choice-list">
                    {barbers.map((barber) => {
                      const selected =
                        selection.barber === barber.name;

                      return (
                        <button
                          key={barber.name}
                          type="button"
                          className={`choice ${selected ? "selected" : ""
                            }`}
                          onClick={() =>
                            updateSelection(
                              "barber",
                              barber.name
                            )
                          }
                        >
                          {barber.image ? (
                            <img
                              src={barber.image}
                              alt=""
                            />
                          ) : (
                            <span className="any-avatar">
                              {barber.name?.charAt(0)}
                            </span>
                          )}

                          <span>
                            <strong>{barber.name}</strong>

                            <small>
                              {barber.role}
                            </small>
                          </span>

                          <span className="choice-radio">
                            {selected ? (
                              <Check size={14} />
                            ) : null}
                          </span>
                        </button>
                      );
                    })}

                    {/* ANY AVAILABLE BARBER */}
                    <button
                      type="button"
                      className={`choice ${selection.barber ===
                          "Any available barber"
                          ? "selected"
                          : ""
                        }`}
                      onClick={() =>
                        updateSelection(
                          "barber",
                          "Any available barber"
                        )
                      }
                    >
                      <span className="any-avatar">
                        +
                      </span>

                      <span>
                        <strong>
                          Any available barber
                        </strong>

                        <small>
                          Let us choose the best
                          available barber.
                        </small>
                      </span>

                      <span className="choice-radio">
                        {selection.barber ===
                          "Any available barber" ? (
                          <Check size={14} />
                        ) : null}
                      </span>
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3 — DATE & TIME */}
              {step === 3 && (
                <div className="booking-content">
                  <p className="booking-intro">
                    Choose your date and time.
                  </p>

                  <div>
                    <span className="eyebrow">
                      SELECT DATE
                    </span>

                    <div className="date-grid">
                      {demoDates.map((date, index) => {
                        const value =
                          typeof date === "object"
                            ? date.value ??
                            date.date ??
                            date.label ??
                            String(index + 1)
                            : date;

                        const label =
                          typeof date === "object"
                            ? date.label ??
                            date.day ??
                            date.date ??
                            value
                            : date;

                        const selected =
                          selection.date === value;

                        return (
                          <button
                            key={`${value}-${index}`}
                            type="button"
                            className={
                              selected
                                ? "selected"
                                : ""
                            }
                            onClick={() =>
                              updateSelection(
                                "date",
                                value
                              )
                            }
                          >
                            {label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <span className="eyebrow">
                      SELECT TIME
                    </span>

                    <div className="time-grid">
                      {demoTimes.map((time) => {
                        const value =
                          typeof time === "object"
                            ? time.value ??
                            time.time ??
                            time.label
                            : time;

                        const label =
                          typeof time === "object"
                            ? time.label ??
                            time.time ??
                            value
                            : time;

                        const selected =
                          selection.time === value;

                        return (
                          <button
                            key={value}
                            type="button"
                            className={
                              selected
                                ? "selected"
                                : ""
                            }
                            onClick={() =>
                              updateSelection(
                                "time",
                                value
                              )
                            }
                          >
                            {label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <p className="demo-note">
                    Availability shown is for demonstration
                    purposes only. No real appointment is
                    created.
                  </p>
                </div>
              )}

              {/* STEP 4 — DETAILS */}
              {step === 4 && (
                <div className="booking-content">
                  <p className="booking-intro">
                    Your details.
                  </p>

                  <div className="form-grid">
                    <label>
                      FULL NAME
                      <input
                        type="text"
                        value={selection.name}
                        onChange={(event) =>
                          updateSelection(
                            "name",
                            event.target.value
                          )
                        }
                        placeholder="Your full name"
                        autoComplete="name"
                      />
                    </label>

                    <label>
                      EMAIL
                      <input
                        type="email"
                        value={selection.email}
                        onChange={(event) =>
                          updateSelection(
                            "email",
                            event.target.value
                          )
                        }
                        placeholder="you@example.com"
                        autoComplete="email"
                      />
                    </label>

                    <label>
                      PHONE
                      <input
                        type="tel"
                        value={selection.phone}
                        onChange={(event) =>
                          updateSelection(
                            "phone",
                            event.target.value
                          )
                        }
                        placeholder="+44..."
                        autoComplete="tel"
                      />
                    </label>

                    <label className="full">
                      SPECIAL REQUEST
                      <textarea
                        value={selection.request}
                        onChange={(event) =>
                          updateSelection(
                            "request",
                            event.target.value
                          )
                        }
                        placeholder="Anything we should know before your appointment?"
                      />
                    </label>
                  </div>
                </div>
              )}
            </div>

            {/* FOOTER */}
            <div className="booking-footer">
              <button
                className="back-link"
                type="button"
                onClick={back}
                disabled={step === 1}
              >
                <ChevronLeft size={15} />
                BACK
              </button>

              {step < 4 ? (
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={next}
                  disabled={!canContinue}
                >
                  CONTINUE
                  <ChevronRight size={15} />
                </button>
              ) : (
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={confirm}
                  disabled={!canContinue}
                >
                  CONFIRM REQUEST
                  <ChevronRight size={15} />
                </button>
              )}
            </div>
          </>
        ) : (
          /* CONFIRMATION */
          <>
            <div className="confirmation">
              <div className="confirm-mark">
                <Check size={28} />
              </div>

              <p>
                This is a concept booking experience.
                Your request has been created for the
                demonstration only.
              </p>

              <div className="summary-card">
                <div>
                  <span>Service</span>
                  <strong>
                    {currentService?.name ||
                      selection.service}
                  </strong>
                </div>

                <div>
                  <span>Barber</span>
                  <strong>
                    {currentBarber?.name ||
                      selection.barber}
                  </strong>
                </div>

                <div>
                  <span>Date</span>
                  <strong>{selection.date}</strong>
                </div>

                <div>
                  <span>Time</span>
                  <strong>{selection.time}</strong>
                </div>

                <div>
                  <span>Name</span>
                  <strong>{selection.name}</strong>
                </div>

                <div>
                  <span>Price</span>
                  <strong>
                    {currentService
                      ? `£${currentService.price}`
                      : "—"}
                  </strong>
                </div>
              </div>

              <button
                className="btn btn-primary"
                type="button"
                onClick={onClose}
              >
                CLOSE
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}